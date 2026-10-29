import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import crypto from 'crypto';

// Secure Admin Key (configured as requested)
const ADMIN_SECRET = process.env.ADMIN_PORTAL_SECRET || '41308';

// Constant-time comparison to prevent timing attacks
function timingSafeEqualStr(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// In-memory brute-force rate limiter for Admin API
const failedAttemptsMap = new Map();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes lockout

function checkBruteForce(ip) {
  const now = Date.now();
  const record = failedAttemptsMap.get(ip);
  if (!record) return { blocked: false };

  if (now > record.resetAt) {
    failedAttemptsMap.delete(ip);
    return { blocked: false };
  }

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    const minutesLeft = Math.ceil((record.resetAt - now) / 60000);
    return { blocked: true, minutesLeft };
  }

  return { blocked: false };
}

function registerFailure(ip) {
  const now = Date.now();
  const record = failedAttemptsMap.get(ip) || { count: 0, resetAt: now + LOCKOUT_WINDOW_MS };
  record.count += 1;
  record.resetAt = now + LOCKOUT_WINDOW_MS;
  failedAttemptsMap.set(ip, record);
}

function clearFailures(ip) {
  failedAttemptsMap.delete(ip);
}

export async function GET(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  // Check rate limit
  const rateCheck = checkBruteForce(clientIp);
  if (rateCheck.blocked) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many failed admin attempts. Account locked for ${rateCheck.minutesLeft} minutes.`,
      },
      { status: 429 }
    );
  }

  // Check secret via Authorization header or query param
  const authHeader = request.headers.get('authorization') || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  const { searchParams } = new URL(request.url);
  const secretParam = searchParams.get('secret');

  const providedSecret = bearerToken || secretParam;

  if (!providedSecret || !timingSafeEqualStr(providedSecret, ADMIN_SECRET)) {
    registerFailure(clientIp);
    return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
  }

  clearFailures(clientIp);
  const supabase = getSupabaseServerClient();

  try {
    // 1. Fetch Orders (Max 200)
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (ordersError) throw ordersError;

    // 2. Fetch Order Items
    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .order('created_at', { ascending: false });

    // 3. Compute Real KPIs
    const totalOrders = orders ? orders.length : 0;
    const totalRevenue = orders
      ? orders.reduce((sum, o) => sum + (Number(o.total) || Number(o.total_amount) || 0), 0)
      : 0;
    const pendingOrders = orders
      ? orders.filter(
          (o) =>
            (o.status || o.order_status) === 'pending' ||
            o.payment_status === 'pending_verification'
        ).length
      : 0;
    const dispatchedOrders = orders
      ? orders.filter((o) => o.order_status === 'dispatched' || o.order_status === 'shipped').length
      : 0;
    const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    return NextResponse.json({
      success: true,
      kpis: {
        totalOrders,
        totalRevenue,
        pendingOrders,
        dispatchedOrders,
        aov,
      },
      orders: orders || [],
      items: items || [],
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  const body = await request.json();
  const { secret, orderId, paymentStatus, orderStatus } = body || {};

  const authHeader = request.headers.get('authorization') || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const providedSecret = bearerToken || secret;

  if (!providedSecret || !timingSafeEqualStr(providedSecret, ADMIN_SECRET)) {
    registerFailure(clientIp);
    return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
  }

  const supabase = getSupabaseServerClient();
  const updates = {};

  if (paymentStatus) {
    updates.payment_status = paymentStatus;
  }
  if (orderStatus) {
    updates.order_status = orderStatus;
    updates.status = orderStatus;
  }

  try {
    const { error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId);

    if (error) throw error;

    return NextResponse.json({ success: true, updates });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
