import emailjs from '@emailjs/browser';

// EmailJS Configuration - Free tier (200 emails/month)
// You need to set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create free account
// 2. Add Gmail/Outlook email service
// 3. Create email template with variables: {{order_number}}, {{customer_name}}, {{customer_email}}, {{customer_phone}}, {{customer_address}}, {{customer_city}}, {{items_list}}, {{subtotal}}, {{delivery}}, {{discount}}, {{total}}, {{payment_method}}
// 4. Replace the IDs below with your actual IDs

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || '[EMAIL_ADDRESS]';

/**
 * Send order notification email to admin
 * @param {Object} orderData - Order details
 * @param {Array} cartItems - Cart items
 */
export const sendOrderNotification = async (orderData, cartItems) => {
  try {
    // Format items list
    const itemsList = cartItems.map(item => 
      `• ${item.name} (${item.size || '50ml'}) × ${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const templateParams = {
      to_email: ADMIN_EMAIL,
      order_number: orderData.orderNumber,
      customer_name: orderData.name,
      customer_email: orderData.email,
      customer_phone: orderData.phone,
      customer_address: orderData.address,
      customer_city: orderData.city,
      items_list: itemsList,
      items_count: cartItems.length,
      subtotal: `Rs. ${orderData.subtotal?.toLocaleString() || '0'}`,
      delivery: `Rs. ${orderData.delivery?.toLocaleString() || '300'}`,
      discount: orderData.discount ? `Rs. ${orderData.discount?.toLocaleString()}` : 'None',
      total: `Rs. ${orderData.total?.toLocaleString() || '0'}`,
      payment_method: orderData.paymentMethod === 'bankTransfer' ? 'Bank Transfer' : orderData.paymentMethod,
      order_date: new Date().toLocaleString('en-PK', { 
        timeZone: 'Asia/Karachi',
        dateStyle: 'full',
        timeStyle: 'short'
      }),
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('[EMAIL] Order notification sent successfully:', response.status);
    return { success: true, status: response.status };
  } catch (error) {
    console.error('[EMAIL] Failed to send order notification:', error);
    // Don't throw - email failure shouldn't block order
    return { success: false, error: error.text || error.message };
  }
};

/**
 * Alternative: Send via Supabase Edge Function (if EmailJS quota exceeded)
 * This uses a Supabase database trigger to send emails
 */
export const logOrderForEmail = async (supabaseClient, orderData, cartItems) => {
  try {
    const { error } = await supabaseClient
      .from('email_notifications')
      .insert([{
        to_email: ADMIN_EMAIL,
        subject: `New Order: ${orderData.orderNumber}`,
        body: JSON.stringify({
          order_number: orderData.orderNumber,
          customer: {
            name: orderData.name,
            email: orderData.email,
            phone: orderData.phone,
            address: orderData.address,
            city: orderData.city,
          },
          items: cartItems.map(item => ({
            name: item.name,
            size: item.size || '50ml',
            quantity: item.quantity,
            price: item.price,
          })),
          total: orderData.total,
          payment_method: orderData.paymentMethod,
        }),
        status: 'pending',
      }]);

    if (error) throw error;
    console.log('[EMAIL] Order logged for email notification');
    return { success: true };
  } catch (error) {
    console.error('[EMAIL] Failed to log order for email:', error);
    return { success: false, error: error.message };
  }
};
