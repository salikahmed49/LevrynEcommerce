/**
 * Automated Order Confirmation Email Service
 * 
 * Supports Resend (recommended, 3,000 free emails/mo) via direct HTTP API.
 * Requires zero heavy npm dependencies and works seamlessly on Vercel Serverless.
 */

import { BANK_CONFIG } from './config';

/**
 * Generates an editorial luxury HTML email template matching the Levryn aesthetic.
 */
function generateOrderEmailHtml({
  orderNumber,
  customerName,
  customerPhone,
  customerAddress,
  customerCity,
  items,
  subtotal,
  shippingFee,
  total,
}) {
  const whatsappUrl = `https://wa.me/${(BANK_CONFIG.supportWhatsApp || '923272332833').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hi Levryn, I have placed order ${orderNumber} for Rs. ${total.toLocaleString()}. Here is my payment confirmation screenshot.`
  )}`;

  const itemsRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: #1E2B28;">
          <strong>${item.name || item.productName}</strong>
          <span style="display: block; font-size: 12px; color: #6B7280; margin-top: 2px;">Flacon Size: ${item.size} &times; ${item.quantity}</span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB; text-align: right; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; color: #1E2B28;">
          Rs. ${(item.total || item.unitPrice * item.quantity).toLocaleString()}
        </td>
      </tr>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Levryn Order ${orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAF9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAF9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
          
          <!-- Luxury Header -->
          <tr>
            <td style="background-color: #1E2B28; padding: 36px 32px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Georgia', serif; font-size: 32px; letter-spacing: 0.16em; color: #FFFFFF; font-weight: 500;">
                LEVRYN
              </h1>
              <p style="margin: 8px 0 0; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #C5A059;">
                Artisanal Haute Parfumerie &middot; Pakistan
              </p>
            </td>
          </tr>

          <!-- Confirmation Hero -->
          <tr>
            <td style="padding: 32px 32px 20px;">
              <h2 style="margin: 0 0 12px; font-family: 'Georgia', serif; font-size: 22px; color: #1E2B28; font-weight: 500;">
                Order Confirmation
              </h2>
              <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: #4B5563;">
                Dear <strong>${customerName}</strong>,<br>
                Thank you for choosing Levryn. Your order has been placed successfully and is currently reserved pending bank transfer verification.
              </p>
              
              <div style="background-color: #F3F4F6; border-radius: 6px; padding: 12px 16px; margin-bottom: 24px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B7280; display: block;">Order Reference</span>
                <strong style="font-size: 18px; color: #2F4F4F; letter-spacing: 0.05em;">${orderNumber}</strong>
              </div>
            </td>
          </tr>

          <!-- Bank Transfer Action Box -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #FAFBFB; border: 1.5px solid #2F4F4F; border-radius: 8px; padding: 20px;">
                <tr>
                  <td>
                    <span style="display: block; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #2F4F4F; font-weight: 700; margin-bottom: 6px;">
                      Bank Transfer Instructions
                    </span>
                    <p style="margin: 0 0 16px; font-size: 13px; color: #4B5563; line-height: 1.5;">
                      Please transfer the exact verified total to our account using your mobile banking app (HBL, Raast, Nayapay, Sadapay, etc.):
                    </p>

                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 13px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 4px 0; color: #6B7280;">Bank:</td>
                        <td style="padding: 4px 0; font-weight: 600; color: #1E2B28; text-align: right;">${BANK_CONFIG.bankName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #6B7280;">Account Title:</td>
                        <td style="padding: 4px 0; font-weight: 600; color: #1E2B28; text-align: right;">${BANK_CONFIG.accountTitle}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #6B7280;">Account Number:</td>
                        <td style="padding: 4px 0; font-weight: 700; color: #2F4F4F; font-size: 15px; text-align: right; letter-spacing: 0.04em;">${BANK_CONFIG.accountNumber}</td>
                      </tr>
                      <tr style="border-top: 1px solid #E5E7EB;">
                        <td style="padding: 8px 0 0; color: #1E2B28; font-weight: 600;">Verified Total:</td>
                        <td style="padding: 8px 0 0; font-weight: 700; color: #2F4F4F; font-size: 16px; text-align: right;">Rs. ${total.toLocaleString()}</td>
                      </tr>
                    </table>

                    <div style="text-align: center; margin-top: 14px;">
                      <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #2F4F4F; color: #FFFFFF; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; border-radius: 4px;">
                        Share Transfer Screenshot on WhatsApp &rarr;
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <h3 style="margin: 0 0 12px; font-family: 'Georgia', serif; font-size: 16px; color: #1E2B28; font-weight: 500; border-bottom: 1px solid #E5E7EB; padding-bottom: 8px;">
                Items in Your Order
              </h3>
              
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                ${itemsRows}
              </table>

              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #4B5563;">
                <tr>
                  <td style="padding: 4px 0;">Subtotal:</td>
                  <td style="padding: 4px 0; text-align: right;">Rs. ${subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;">Tracked Nationwide Courier:</td>
                  <td style="padding: 4px 0; text-align: right;">${shippingFee === 0 ? 'Complimentary' : `Rs. ${shippingFee}`}</td>
                </tr>
                <tr style="border-top: 1.5px solid #1E2B28; font-size: 15px; font-weight: 700; color: #1E2B28;">
                  <td style="padding: 10px 0 4px;">Total:</td>
                  <td style="padding: 10px 0 4px; text-align: right; color: #2F4F4F;">Rs. ${total.toLocaleString()}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery Address Details -->
          <tr>
            <td style="background-color: #F8FAF9; padding: 24px 32px; border-top: 1px solid #E5E7EB;">
              <h4 style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #6B7280;">
                Dispatch Address
              </h4>
              <p style="margin: 0; font-size: 13px; color: #1E2B28; line-height: 1.5;">
                <strong>${customerName}</strong><br>
                ${customerAddress}<br>
                ${customerCity}, Pakistan<br>
                Contact: ${customerPhone}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center; font-size: 12px; color: #9CA3AF; line-height: 1.6;">
              Questions regarding your order? Contact our fragrance consultants directly via WhatsApp at 
              <a href="https://wa.me/923272332833" style="color: #2F4F4F; text-decoration: none; font-weight: 600;">+92 327 2332833</a> 
              or email <a href="mailto:info@levryn.com" style="color: #2F4F4F; text-decoration: none;">info@levryn.com</a>.<br><br>
              &copy; ${new Date().getFullYear()} Levryn Perfumes. All rights reserved.<br>
              https://www.shoplevryn.com
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Sends order confirmation email via Resend API.
 * Gracefully falls back if RESEND_API_KEY is not configured yet.
 */
export async function sendOrderConfirmationEmail(orderData) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ORDER_EMAIL_FROM || 'Levryn Perfumes <orders@shoplevryn.com>';
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || 'info@levryn.com';

  if (!apiKey) {
    console.info(
      `[EMAIL] RESEND_API_KEY is not configured in .env. Skipping automated confirmation email for order ${orderData.orderNumber}. Set RESEND_API_KEY to activate.`
    );
    return { success: false, reason: 'RESEND_API_KEY_NOT_CONFIGURED' };
  }

  const html = generateOrderEmailHtml(orderData);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [orderData.customerEmail],
        bcc: [ownerEmail], // Sends a blind copy to store owner so they know immediately
        subject: `Order Confirmation: ${orderData.orderNumber} - Levryn Extrait de Parfum`,
        html,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[EMAIL] Failed to send confirmation email via Resend:`, errorText);
      return { success: false, error: errorText };
    }

    const data = await res.json();
    console.log(`[EMAIL] Confirmation email dispatched successfully for order ${orderData.orderNumber}: ID ${data.id}`);
    return { success: true, id: data.id };
  } catch (error) {
    console.error(`[EMAIL] Exception occurred during email dispatch:`, error);
    return { success: false, error: error.message };
  }
}
