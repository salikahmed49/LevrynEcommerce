# Admin Panel Access Guide - Levryn Platform

## 🔐 How to Access the Admin Panel

### Step 1: Navigate to Admin Login Page
There are two ways to access the admin login:

**Option A: Direct URL**
```
http://localhost:3000/levryn-auth-gate
```
Or on production:
```
https://your-domain.com/levryn-auth-gate
```

**Option B: Manual Navigation**
- Type the URL directly in your browser address bar
- The admin login is intentionally hidden (not linked from the main site for security)

---

### Step 2: Login with Admin Credentials

**Email**: `salikahmed49@gmail.com`

**Password**: Your Supabase authentication password

> **Note**: You need to set up this admin user in Supabase first (see Setup section below)

---

### Step 3: Access Admin Dashboard

After successful login, you'll be automatically redirected to:
```
http://localhost:3000/admin-levryn-dashboard
```

---

## 🛠️ First-Time Setup (If Admin User Doesn't Exist)

### Create Admin User in Supabase

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com
   - Login to your project

2. **Navigate to Authentication**
   - Click "Authentication" in left sidebar
   - Click "Users" tab

3. **Add New User**
   - Click "Add user" button
   - Select "Create new user"
   - Enter email: `salikahmed49@gmail.com`
   - Enter a secure password (save this!)
   - Click "Create user"

4. **Confirm Email (Optional)**
   - If email confirmation is required, check your email
   - Click the confirmation link

5. **Test Login**
   - Go to `/levryn-auth-gate`
   - Login with the credentials you just created

---

## 📊 Admin Dashboard Features

Once logged in, you can:

### View Statistics
- **Total Sales**: Sum of all delivered orders (in Rs.)
- **Pending Orders**: Count of pending orders
- **Processing Orders**: Count of orders being processed
- **Delivered Orders**: Count of completed deliveries

### Manage Orders
- **View All Orders**: Sorted by newest first
- **Customer Details**: Name, email, phone, address
- **Order Items**: Product name, size, price, quantity
- **Order Total**: Total amount for each order

### Update Order Status
- Click the status dropdown for any order
- Select new status:
  - **Pending**: Order received, awaiting processing
  - **Processing**: Order is being prepared
  - **Shipped**: Order has been shipped
  - **Delivered**: Order delivered to customer
  - **Cancelled**: Order cancelled

### Customer Insights
- **Repeat Customer Badge**: Automatically shows for customers with multiple orders
- **Order Count**: Displays number of previous orders

### Real-time Updates
- Dashboard automatically refreshes when new orders arrive
- No need to manually reload the page

---

## 🔒 Security Features

### Access Control
- **Email Verification**: Only `salikahmed49@gmail.com` can access
- **Session Check**: Validates on every page load
- **Auto-Redirect**: Unauthorized users are sent back to login

### Protected Routes
- `/levryn-auth-gate` - Login page
- `/admin-levryn-dashboard` - Admin dashboard (requires authentication)

---

## 📱 Mobile Access

The admin dashboard is fully mobile-responsive!

### Access from Mobile Device
1. Find your computer's local IP address:
   - Windows: Run `ipconfig` in command prompt
   - Mac/Linux: Run `ifconfig` in terminal
   
2. On your mobile device, visit:
   ```
   http://YOUR_IP_ADDRESS:3000/levryn-auth-gate
   ```
   Example: `http://192.168.1.100:3000/levryn-auth-gate`

3. Login with admin credentials

4. Manage orders from your phone!

---

## 🐛 Troubleshooting

### Issue: Can't Login
**Solutions**:
- Verify email is exactly: `salikahmed49@gmail.com`
- Check password is correct
- Ensure user exists in Supabase Authentication
- Check browser console for errors (F12 → Console)

### Issue: Redirected Back to Login
**Solutions**:
- Session may have expired - try logging in again
- Clear browser cookies and try again
- Check Supabase connection in `.env` file

### Issue: Can't See Orders
**Solutions**:
- Verify Supabase credentials in `.env`
- Check browser console for errors
- Ensure orders table exists in Supabase
- Check RLS (Row Level Security) policies in Supabase

### Issue: Can't Update Order Status
**Solutions**:
- Check browser console for errors
- Verify RLS policies allow updates
- Ensure you're logged in as admin

---

## 🔑 Important URLs

### Development (Local)
- **Admin Login**: `http://localhost:3000/levryn-auth-gate`
- **Admin Dashboard**: `http://localhost:3000/admin-levryn-dashboard`

### Production (Replace with your domain)
- **Admin Login**: `https://your-domain.com/levryn-auth-gate`
- **Admin Dashboard**: `https://your-domain.com/admin-levryn-dashboard`

---

## 📝 Admin Credentials Reference

**Email**: `salikahmed49@gmail.com`  
**Password**: [Set in Supabase - keep secure!]

> **Security Tip**: Never share your admin password. Change it regularly in Supabase.

---

## 🎯 Quick Access Checklist

Before accessing admin panel:
- [ ] Supabase project is set up
- [ ] Admin user created in Supabase Authentication
- [ ] `.env` file has correct Supabase credentials
- [ ] Development server is running (`npm start`)
- [ ] You know the admin password

---

## 💡 Pro Tips

1. **Bookmark the Admin URL**: Save `/levryn-auth-gate` for quick access
2. **Use Mobile**: Manage orders on the go from your phone
3. **Check Console Logs**: Look for `[ADMIN]` prefix for debugging
4. **Real-time Updates**: Dashboard auto-refreshes when new orders arrive
5. **Logout When Done**: Click "Logout" button for security

---

## 📞 Need Help?

If you're having trouble accessing the admin panel:
1. Check the browser console (F12 → Console)
2. Look for error messages
3. Verify Supabase credentials
4. Ensure admin user exists in Supabase
5. Try clearing browser cache/cookies

---

**Admin Panel is Ready!** 🚀

Navigate to `/levryn-auth-gate` and login to start managing your orders.
