# Automated Email System Setup Guide

## 📧 Overview

This guide will help you set up automated order confirmation emails using **Supabase Edge Functions** and **Resend** (email service).

---

## 🚀 Quick Setup (3 Steps)

### **Step 1: Create Resend Account**
1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Verify your email
4. Get your API key from dashboard

### **Step 2: Configure Supabase**
1. Go to your Supabase project dashboard
2. Click "Database" → "Triggers"
3. Create a new trigger (see SQL below)

### **Step 3: Add Environment Variables**
1. In Supabase dashboard, go to "Project Settings" → "API"
2. Add `RESEND_API_KEY` to environment variables

---

## 📝 Detailed Setup Instructions

### **1. Resend Setup**

#### Create Account:
```
1. Visit: https://resend.com
2. Click "Sign Up"
3. Enter your email (use: salikahmed49@gmail.com)
4. Verify email
5. Complete profile
```

#### Get API Key:
```
1. Go to Dashboard
2. Click "API Keys" in sidebar
3. Click "Create API Key"
4. Name it: "Levryn Production"
5. Copy the key (starts with re_...)
6. Save it securely!
```

#### Add Sending Domain (Optional but Recommended):
```
1. Click "Domains" in sidebar
2. Click "Add Domain"
3. Enter: levryn.com (or your domain)
4. Add DNS records as shown
5. Verify domain
```

**Note**: Without a verified domain, emails will be sent from `onboarding@resend.dev`

---

### **2. Supabase Database Trigger**

#### Create the Trigger Function:

Go to Supabase SQL Editor and run this:

```sql
-- Create function to send order confirmation email
CREATE OR REPLACE FUNCTION send_order_confirmation_email()
RETURNS TRIGGER AS $$
DECLARE
  order_items_text TEXT;
  item RECORD;
BEGIN
  -- Build order items list
  order_items_text := '';
  FOR item IN 
    SELECT product_name, product_size, quantity, product_price
    FROM order_items
    WHERE order_id = NEW.id
  LOOP
    order_items_text := order_items_text || 
      '• ' || item.product_name || 
      ' (' || item.product_size || ') - ' ||
      'Qty: ' || item.quantity || 
      ' - Rs. ' || (item.product_price * item.quantity) || E'\n';
  END LOOP;

  -- Call Edge Function to send email
  PERFORM
    net.http_post(
      url := 'https://your-project-ref.supabase.co/functions/v1/send-order-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object(
        'order_number', NEW.order_number,
        'customer_name', NEW.customer_name,
        'customer_email', NEW.customer_email,
        'customer_phone', NEW.customer_phone,
        'customer_address', NEW.customer_address,
        'customer_city', NEW.customer_city,
        'total', NEW.total,
        'order_items', order_items_text,
        'created_at', NEW.created_at
      )
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on orders table
DROP TRIGGER IF EXISTS on_order_created ON orders;
CREATE TRIGGER on_order_created
  AFTER INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION send_order_confirmation_email();
```

**Important**: Replace `your-project-ref` with your actual Supabase project reference.

---

### **3. Supabase Edge Function**

#### Create Edge Function:

**File**: `supabase/functions/send-order-email/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const {
      order_number,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      customer_city,
      total,
      order_items,
      created_at
    } = await req.json()

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Levryn <orders@levryn.com>', // Change to your verified domain
        to: [customer_email],
        subject: `Order Confirmation - ${order_number}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
              .order-details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .order-number { font-size: 24px; color: #D4AF37; font-weight: bold; }
              .items-list { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; white-space: pre-line; }
              .total { font-size: 24px; color: #D4AF37; font-weight: bold; text-align: right; margin-top: 20px; }
              .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; color: #666; }
              .button { display: inline-block; background: #D4AF37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✓ Order Confirmed!</h1>
                <p>Thank you for your order</p>
              </div>
              
              <div class="content">
                <p>Dear ${customer_name},</p>
                
                <p>Thank you for shopping with Levryn! Your order has been received and is being processed.</p>
                
                <div class="order-details">
                  <p><strong>Order Number:</strong> <span class="order-number">${order_number}</span></p>
                  <p><strong>Order Date:</strong> ${new Date(created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
                
                <h3>Order Items:</h3>
                <div class="items-list">${order_items}</div>
                
                <div class="total">
                  Total: Rs. ${total.toLocaleString()}
                </div>
                
                <h3>Shipping Address:</h3>
                <p>
                  ${customer_name}<br>
                  ${customer_address}<br>
                  ${customer_city}<br>
                  Phone: ${customer_phone}
                </p>
                
                <h3>Next Steps:</h3>
                <ol>
                  <li>Transfer Rs. ${total.toLocaleString()} to our bank account</li>
                  <li>Send payment screenshot to WhatsApp: +92 327 2332833</li>
                  <li>We'll process your order within 24 hours</li>
                </ol>
                
                <h3>Bank Details:</h3>
                <div class="order-details">
                  <p><strong>Bank:</strong> HBL</p>
                  <p><strong>Account Number:</strong> 00857902268603</p>
                  <p><strong>Account Title:</strong> Salik Ahmed AA</p>
                </div>
                
                <center>
                  <a href="https://wa.me/923272332833?text=Hi%2C%20I%20placed%20order%20${order_number}" class="button">
                    Contact Us on WhatsApp
                  </a>
                </center>
                
                <p>If you have any questions, feel free to contact us!</p>
              </div>
              
              <div class="footer">
                <p><strong>Levryn Perfumes</strong></p>
                <p>Email: info@levryn.com | Phone: +92 327 2332833</p>
                <p>Instagram: @levryn__ | Facebook: Levryn</p>
              </div>
            </div>
          </body>
          </html>
        `
      })
    })

    const data = await res.json()

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})
```

---

### **4. Deploy Edge Function**

#### Install Supabase CLI:
```bash
npm install -g supabase
```

#### Login to Supabase:
```bash
supabase login
```

#### Link to your project:
```bash
supabase link --project-ref your-project-ref
```

#### Deploy the function:
```bash
supabase functions deploy send-order-email
```

#### Set environment variable:
```bash
supabase secrets set RESEND_API_KEY=re_your_api_key_here
```

---

## 🎨 Email Template Preview

```
┌────────────────────────────────────┐
│   ✓ Order Confirmed!               │
│   Thank you for your order         │
├────────────────────────────────────┤
│ Dear Customer Name,                │
│                                    │
│ Order Number: LEV-123456           │
│ Order Date: Jan 4, 2026            │
│                                    │
│ Order Items:                       │
│ • Product 1 (50ml) - Qty: 1        │
│ • Product 2 (100ml) - Qty: 2       │
│                                    │
│ Total: Rs. 5,250                   │
│                                    │
│ Shipping Address:                  │
│ Customer Name                      │
│ Address Line                       │
│ City                               │
│                                    │
│ Next Steps:                        │
│ 1. Transfer payment                │
│ 2. Send screenshot                 │
│ 3. We'll process order             │
│                                    │
│ [Contact Us on WhatsApp]           │
├────────────────────────────────────┤
│ Levryn Perfumes                    │
│ info@levryn.com | +92 327 2332833  │
└────────────────────────────────────┘
```

---

## 🧪 Testing

### Test the Email System:

1. **Place a test order** on your website
2. **Check customer email** for confirmation
3. **Check Resend dashboard** for delivery status
4. **Check Supabase logs** for any errors

### Manual Test (Optional):

```bash
curl -X POST https://your-project-ref.supabase.co/functions/v1/send-order-email \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "order_number": "LEV-TEST123",
    "customer_name": "Test Customer",
    "customer_email": "test@example.com",
    "total": 5000,
    "order_items": "• Test Product (50ml) - Qty: 1 - Rs. 5000"
  }'
```

---

## 💰 Pricing

### Resend Free Tier:
- **100 emails/day** - FREE
- **3,000 emails/month** - FREE
- Perfect for starting out!

### Paid Plans (if needed):
- **$20/month**: 50,000 emails
- **$80/month**: 100,000 emails

---

## 🔒 Security Best Practices

1. **Never commit API keys** to Git
2. **Use environment variables** for all secrets
3. **Enable email verification** in Resend
4. **Monitor email logs** regularly
5. **Set up SPF/DKIM** records for your domain

---

## 🐛 Troubleshooting

### Emails Not Sending:

**Check**:
1. ✅ Resend API key is correct
2. ✅ Edge function is deployed
3. ✅ Trigger is created in database
4. ✅ Customer email is valid
5. ✅ Check Supabase function logs
6. ✅ Check Resend dashboard logs

### Common Issues:

**Issue**: "Invalid API key"
**Solution**: Verify RESEND_API_KEY in Supabase secrets

**Issue**: "Emails going to spam"
**Solution**: Verify your sending domain in Resend

**Issue**: "Trigger not firing"
**Solution**: Check trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'on_order_created';`

---

## 📊 Monitoring

### Check Email Status:

1. **Resend Dashboard**: See all sent emails
2. **Supabase Logs**: Check function execution
3. **Database Logs**: Verify trigger firing

### Email Analytics:

Resend provides:
- ✅ Delivery rate
- ✅ Open rate
- ✅ Click rate
- ✅ Bounce rate

---

## 🎯 Email Content Customization

### Modify Email Template:

Edit the `html` section in `send-order-email/index.ts`:

```typescript
html: `
  <!-- Your custom HTML here -->
  <h1>Custom Header</h1>
  <p>Custom content</p>
`
```

### Add Your Logo:

```html
<img src="https://your-domain.com/logo.png" alt="Levryn" style="width: 150px;">
```

### Change Colors:

```css
.header { background: #your-color; }
.button { background: #your-color; }
```

---

## ✅ Setup Checklist

- [ ] Created Resend account
- [ ] Got Resend API key
- [ ] Added API key to Supabase secrets
- [ ] Created database trigger
- [ ] Created Edge Function file
- [ ] Deployed Edge Function
- [ ] Tested with sample order
- [ ] Verified email received
- [ ] Checked email formatting
- [ ] Set up domain (optional)
- [ ] Configured SPF/DKIM (optional)

---

## 🚀 Alternative: Simple Email (No Edge Function)

If you want a simpler solution without Edge Functions:

### Use Supabase's Built-in Email:

```sql
-- Simple trigger using pg_notify
CREATE OR REPLACE FUNCTION notify_new_order()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'new_order',
    json_build_object(
      'order_id', NEW.id,
      'email', NEW.customer_email,
      'order_number', NEW.order_number
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_order_notify
  AFTER INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_order();
```

Then handle in your React app or use a service like **Zapier** or **Make.com** to send emails.

---

## 📞 Support

Need help? Contact:
- **Resend Support**: support@resend.com
- **Supabase Support**: support@supabase.com

---

**Email system ready to deploy!** 🎉

Follow the steps above to set up automated order confirmation emails for your customers.

---

*Created: January 4, 2026, 9:25 PM*
