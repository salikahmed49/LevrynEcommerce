import { NextResponse } from 'next/server';
import { calculateOrderTotals } from '@/lib/catalog';
import { BANK_CONFIG } from '@/lib/config';
import { getSupabaseServerClient } from '@/lib/supabase';
import { sendOrderConfirmationEmail } from '@/lib/email';

// In-memory sliding rate limiter (per-IP window)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 10; // max 10 orders per 10 minutes per IP

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Simple periodic cleanup to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(ip);
      }
    }
  }, 15 * 60 * 1000);
}

export async function POST(request) {
  try {
    // 1. IP extraction & rate-limit check
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many order requests. Please wait a few minutes before trying again.',
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const {
      name,
      phone,
      email,
      address,
      city,
      notes,
      couponCode,
      items,
    } = body || {};

    // 3. Strict Server-Side Field Validation
    const cleanName = (name || '').trim();
    const cleanPhone = (phone || '').trim().replace(/[\s-]/g, '');
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanAddress = (address || '').trim();
    const cleanCity = (city || '').trim();
    const cleanNotes = (notes || '').trim();

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    // Pakistan mobile number check (03XX-XXXXXXX or +923XXXXXXXXX)
    const phoneRegex = /^((\+92)|(0092)|(92)|0)?3[0-9]{9}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please enter a valid Pakistani mobile number (e.g. 03001234567).',
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!cleanAddress || cleanAddress.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please provide a complete delivery street address.' },
        { status: 400 }
      );
    }

    if (!cleanCity || cleanCity.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please specify your city.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Your cart is empty. Please add a product to order.' },
        { status: 400 }
      );
    }

    // 4. Server-Side Price & Inventory Calculation (Authoritative)
    let calculated;
    try {
      calculated = calculateOrderTotals(items, couponCode);
    } catch (calcErr) {
      return NextResponse.json(
        { success: false, error: calcErr.message || 'Cart calculation error' },
        { status: 400 }
      );
    }

    const {
      items: validatedItems,
      subtotal,
      discountAmount,
      couponCode: appliedCoupon,
      shippingFee,
      total,
    } = calculated;

    // 5. Generate secure random order number
    const timestampPart = Date.now().toString().slice(-4);
    const randomPart = Math.floor(100 + Math.random() * 900);
    const orderNumber = `LEV-${timestampPart}${randomPart}`;

    // 6. Persist order to Supabase
    const supabase = getSupabaseServerClient();
    let orderRecordId = null;

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            order_number: orderNumber,
            customer_name: cleanName,
            customer_phone: cleanPhone,
            customer_email: cleanEmail,
            customer_address: cleanAddress,
            customer_city: cleanCity,
            customer_notes: cleanNotes || null,
            subtotal,
            discount_amount: discountAmount || 0,
            voucher_code: appliedCoupon || null,
            shipping_fee: shippingFee,
            total_amount: total,
            total: total,
            payment_method: 'bank_transfer',
            payment_status: 'pending_verification',
            order_status: 'placed',
            status: 'pending',
            bank_name: BANK_CONFIG.bankName,
            bank_account_number: BANK_CONFIG.accountNumber,
            bank_account_title: BANK_CONFIG.accountTitle,
            client_ip: clientIp,
          },
        ])
        .select('id')
        .single();

      if (orderError) {
        console.error('[CHECKOUT_API] Supabase order insert error:', orderError.message);
      } else {
        orderRecordId = orderData?.id;

        // Insert line items
        if (orderRecordId && validatedItems.length > 0) {
          const lineItemsToInsert = validatedItems.map((item) => ({
            order_id: orderRecordId,
            product_id: item.productId,
            product_name: item.productName,
            product_size: item.size,
            product_price: item.unitPrice,
            unit_price: item.unitPrice,
            quantity: item.quantity,
            total_price: item.itemTotal,
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(lineItemsToInsert);

          if (itemsError) {
            console.error('[CHECKOUT_API] Supabase order_items error:', itemsError.message);
          }
        }
      }
    } catch (dbErr) {
      console.error('[CHECKOUT_API] Unexpected database error:', dbErr);
    }

    // 7. Send automated confirmation email
    const orderSummaryForEmail = {
      orderNumber,
      customerName: cleanName,
      customerEmail: cleanEmail,
      customerPhone: cleanPhone,
      customerAddress: cleanAddress,
      customerCity: cleanCity,
      items: validatedItems,
      subtotal,
      discountAmount,
      voucherCode: appliedCoupon,
      shippingFee,
      total,
      bankDetails: {
        bankName: BANK_CONFIG.bankName,
        accountNumber: BANK_CONFIG.accountNumber,
        accountTitle: BANK_CONFIG.accountTitle,
      },
    };

    // Non-blocking email dispatch
    sendOrderConfirmationEmail(orderSummaryForEmail).catch((mailErr) => {
      console.warn('[CHECKOUT_API] Confirmation email dispatch deferred:', mailErr.message);
    });

    // 8. Return response
    return NextResponse.json({
      success: true,
      orderNumber,
      subtotal,
      discountAmount,
      appliedCoupon,
      shippingFee,
      total,
      customer: {
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        address: cleanAddress,
        city: cleanCity,
      },
      items: validatedItems,
      bankDetails: {
        bankName: BANK_CONFIG.bankName,
        accountNumber: BANK_CONFIG.accountNumber,
        accountTitle: BANK_CONFIG.accountTitle,
        instructions: BANK_CONFIG.instructions,
      },
    });
  } catch (error) {
    console.error('[CHECKOUT_API] Unhandled error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing your order.',
      },
      { status: 500 }
    );
  }
}
