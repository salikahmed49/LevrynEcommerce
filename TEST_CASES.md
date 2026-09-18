# Levryn Ecommerce - Comprehensive Test Cases

## Pre-Deployment Testing Checklist

### 1. Environment Setup Tests

#### Test 1.1: Environment Variables
- [ ] Verify `.env` file exists with correct Supabase credentials
- [ ] Check `REACT_APP_SUPABASE_URL` is set correctly
- [ ] Check `REACT_APP_SUPABASE_ANON_KEY` is set correctly
- [ ] Verify environment variables are loaded (check browser console for errors)

#### Test 1.2: Supabase Connection
- [ ] Open browser console (F12)
- [ ] Navigate to any page
- [ ] Check for Supabase connection errors
- [ ] Verify Supabase client is initialized (check Network tab for Supabase requests)

**How to Test Supabase:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `window.supabase` (if exposed) or check Network tab
4. Look for any connection errors
5. In Supabase dashboard, check if tables exist

### 2. Navigation Tests

#### Test 2.1: Header Navigation
- [ ] Click "Home" - should navigate to `/`
- [ ] Click "Shop" - should navigate to `/products`
- [ ] Click "About" - should navigate to `/about`
- [ ] Click "Contact" - should navigate to `/contact`
- [ ] Click "Cart" - should navigate to `/cart`
- [ ] Verify cart badge shows correct count when items in cart

#### Test 2.2: Footer Navigation
- [ ] Click footer "Home" link - should navigate to `/`
- [ ] Click footer "Shop" link - should navigate to `/products`
- [ ] Click footer "About" link - should navigate to `/about`
- [ ] Click footer "Contact" link - should navigate to `/contact`

### 3. Home Page Tests

#### Test 3.1: Hero Section
- [ ] Verify hero section displays "LEVRYN" title
- [ ] Verify subtitle "The Art of Scent" is visible
- [ ] Verify "Explore Collection" button works and navigates to `/products`
- [ ] Check responsive design on mobile (viewport < 768px)

#### Test 3.2: Best Sellers Section
- [ ] Verify 4 best-selling products are displayed
- [ ] Verify each product card shows:
  - Product image
  - Product name
  - Size
  - Price (without $ sign)
  - "Add to Cart" button
- [ ] Click "Add to Cart" on a product - verify it's added to cart
- [ ] Click product card - should navigate to product detail page
- [ ] Verify "View All Products" button navigates to `/products`

### 4. Products Page Tests

#### Test 4.1: Product Display
- [ ] Verify all 11 products are displayed:
  - Outlands
  - Coco
  - Medusa
  - Althair
  - Office
  - Issey
  - Cadenza
  - Intensely
  - Marshmallow
  - 11z01
  - TK4
- [ ] Verify each product shows correct image
- [ ] Verify prices display without $ sign
- [ ] Verify sizes are correct

#### Test 4.2: Filtering
- [ ] Select "All Products" - should show all 11 products
- [ ] Select "Best Selling" - should show only best sellers (Outlands, Coco, Althair, Office)
- [ ] Verify filter persists when navigating away and back

#### Test 4.3: Sorting
- [ ] Select "Name (A-Z)" - verify products sorted alphabetically
- [ ] Select "Price (Low to High)" - verify products sorted by price ascending
- [ ] Select "Price (High to Low)" - verify products sorted by price descending
- [ ] Verify sorting works with filter applied

#### Test 4.4: Product Cards
- [ ] Click on any product card - should navigate to `/product/{id}`
- [ ] Click "Add to Cart" - verify product added to cart
- [ ] Verify cart badge updates after adding item

### 5. Product Detail Page Tests

#### Test 5.1: Product Information
- [ ] Navigate to any product detail page (e.g., `/product/1`)
- [ ] Verify product image displays correctly
- [ ] Verify product name is displayed
- [ ] Verify rendition information is shown
- [ ] Verify description is displayed
- [ ] Verify fragrance notes are displayed
- [ ] Verify "Back to Products" button works

#### Test 5.2: Size Selection
- [ ] Verify all three sizes are shown: 30ml, 50ml, 100ml
- [ ] Verify current in-stock size is selected by default
- [ ] Click on different sizes - verify selection changes
- [ ] Verify out-of-stock sizes are disabled
- [ ] Verify prices update when selecting different sizes
- [ ] Verify "In Stock" / "Out of Stock" labels are correct

#### Test 5.3: Add to Cart from Detail Page
- [ ] Select an in-stock size
- [ ] Click "Add to Cart" - verify product added with correct size and price
- [ ] Try to add out-of-stock size - verify button is disabled
- [ ] Verify cart badge updates

#### Test 5.4: Best Seller Badge
- [ ] Navigate to Outlands, Coco, Althair, or Office
- [ ] Verify "⭐ Best Seller" badge is displayed

### 6. Shopping Cart Tests

#### Test 6.1: Cart Display
- [ ] Add items to cart
- [ ] Navigate to `/cart`
- [ ] Verify all added items are displayed
- [ ] Verify each item shows:
  - Product image
  - Product name
  - Size
  - Price
  - Quantity
  - Total price

#### Test 6.2: Quantity Management
- [ ] Click "+" button - verify quantity increases
- [ ] Click "-" button - verify quantity decreases
- [ ] Set quantity to 0 - verify item is removed
- [ ] Verify total price updates correctly

#### Test 6.3: Remove Items
- [ ] Click "×" button on an item - verify item is removed
- [ ] Verify cart total updates
- [ ] Verify cart badge updates

#### Test 6.4: Cart Summary
- [ ] Verify subtotal is calculated correctly
- [ ] Verify total matches subtotal (before voucher)
- [ ] Click "Proceed to Checkout" - should navigate to `/checkout`
- [ ] Click "Clear Cart" - verify all items removed
- [ ] Click "Continue Shopping" - should navigate to `/products`

#### Test 6.5: Empty Cart
- [ ] Clear cart or navigate with empty cart
- [ ] Verify "Your cart is empty" message
- [ ] Verify "Continue Shopping" button works

#### Test 6.6: Cart Persistence
- [ ] Add items to cart
- [ ] Refresh page - verify cart items persist
- [ ] Close and reopen browser - verify cart items persist (localStorage)

### 7. Checkout Page Tests

#### Test 7.1: Form Validation
- [ ] Navigate to checkout with items in cart
- [ ] Try to submit empty form - verify validation errors appear
- [ ] Test each field:
  - Name: required
  - Email: required, must be valid format
  - Phone: required
  - Address: required
  - City: required
  - Postal Code: required

#### Test 7.2: Shipping Information
- [ ] Fill in all required fields
- [ ] Verify form accepts valid data
- [ ] Test invalid email format - should show error
- [ ] Verify errors clear when field is corrected

#### Test 7.3: Payment Method
- [ ] Verify "Bank Transfer" is selected by default
- [ ] Verify bank details are displayed:
  - Account Number: 00857902268603
  - Bank: HBL
  - Account Holder: Salik Ahmed AA
- [ ] Verify "Advance Transfer Only" notice is displayed
- [ ] Verify WhatsApp requirement message is shown (03272332833)

#### Test 7.4: Voucher Codes
- [ ] Enter invalid voucher code - verify error message
- [ ] Enter "LEVRYN10" - verify 10% discount applied
- [ ] Enter "LEVRYN20" - verify 20% discount applied
- [ ] Enter "WELCOME" - verify 15% discount applied
- [ ] Verify discount amount is calculated correctly
- [ ] Verify total updates after voucher application
- [ ] Verify voucher success message appears

#### Test 7.5: Order Summary
- [ ] Verify all cart items are listed
- [ ] Verify quantities are correct
- [ ] Verify prices are correct (without $ sign)
- [ ] Verify subtotal is correct
- [ ] Verify discount is shown if voucher applied
- [ ] Verify final total is correct

#### Test 7.6: Order Submission
- [ ] Fill in all required fields
- [ ] Apply voucher (optional)
- [ ] Click "Place Order"
- [ ] Verify success alert appears
- [ ] Verify cart is cleared
- [ ] Verify redirect to home page

#### Test 7.7: Empty Cart Checkout
- [ ] Navigate to `/checkout` with empty cart
- [ ] Verify "Your cart is empty" message
- [ ] Verify "Continue Shopping" button works

### 8. About Page Tests

#### Test 8.1: Content Display
- [ ] Navigate to `/about`
- [ ] Verify "About Levryn" title
- [ ] Verify "The Art of Accessible Luxury" subtitle
- [ ] Verify all sections are displayed:
  - Introduction paragraph
  - The Artisan's Pledge
  - Iconic Renditions
  - Original Creations
  - Conclusion
- [ ] Verify "Payment Advance Required" notice is displayed

### 9. Contact Page Tests

#### Test 9.1: Contact Information
- [ ] Navigate to `/contact`
- [ ] Verify "Contact Us" title
- [ ] Verify all contact methods are displayed:
  - Email: info@levryn.com (clickable mailto link)
  - Phone: +92 327 2332833 (clickable tel link)
  - WhatsApp: +92 327 2332833 (external link)
  - Instagram: @Levryn (external link)
  - Facebook: Levryn (external link)
- [ ] Click email link - should open email client
- [ ] Click phone link - should open phone dialer
- [ ] Click WhatsApp link - should open WhatsApp
- [ ] Click Instagram link - should open in new tab
- [ ] Click Facebook link - should open in new tab

### 10. Responsive Design Tests

#### Test 10.1: Mobile View (< 768px)
- [ ] Test on mobile device or browser DevTools mobile view
- [ ] Verify header is responsive (hamburger menu if implemented)
- [ ] Verify product grid becomes single column
- [ ] Verify cart items stack vertically
- [ ] Verify checkout form stacks vertically
- [ ] Verify all buttons are easily clickable
- [ ] Verify text is readable

#### Test 10.2: Tablet View (768px - 968px)
- [ ] Verify layout adapts appropriately
- [ ] Verify product grid shows 2 columns
- [ ] Verify forms are readable

#### Test 10.3: Desktop View (> 968px)
- [ ] Verify full layout displays correctly
- [ ] Verify product grid shows multiple columns
- [ ] Verify side-by-side layouts work (cart/checkout)

### 11. Image Loading Tests

#### Test 11.1: Product Images
- [ ] Verify all product images load:
  - outlands.png
  - coco.png
  - medusa.png
  - althair.png
  - office.png
  - issey.png
  - cadenza.png
  - Intensely.png
  - marshmallow.png
  - 11z01.png
  - tk4.png
- [ ] Verify placeholder image loads for missing images
- [ ] Check browser console for 404 errors

### 12. Color Theme Tests

#### Test 12.1: Dark Golden Theme
- [ ] Verify primary color is dark gold (#B8860B), not yellowish
- [ ] Verify hover states use darker gold
- [ ] Verify buttons use gold color
- [ ] Verify links use gold color on hover
- [ ] Verify borders use gold color

### 13. Currency Display Tests

#### Test 13.1: No Dollar Signs
- [ ] Verify NO $ signs appear anywhere:
  - Product cards
  - Product detail pages
  - Cart page
  - Checkout page
  - Order summary
- [ ] Verify prices display as numbers only (e.g., "3,500" not "$3,500")

### 14. Error Handling Tests

#### Test 14.1: Invalid Product ID
- [ ] Navigate to `/product/999` (non-existent ID)
- [ ] Verify "Product not found" message
- [ ] Verify "Back to Products" button works

#### Test 14.2: Missing Images
- [ ] Verify fallback to placeholder image works
- [ ] Check browser console for image errors

### 15. Performance Tests

#### Test 15.1: Page Load
- [ ] Verify pages load quickly (< 3 seconds)
- [ ] Check Network tab for large files
- [ ] Verify images are optimized

#### Test 15.2: Cart Performance
- [ ] Add 10+ items to cart
- [ ] Verify cart still performs well
- [ ] Verify localStorage doesn't cause issues

### 16. Browser Compatibility Tests

#### Test 16.1: Modern Browsers
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)

### 17. Supabase Integration Tests (Optional)

#### Test 17.1: Database Connection
- [ ] Verify Supabase connection works
- [ ] Check Supabase dashboard for connection logs
- [ ] Verify no connection errors in console

#### Test 17.2: Order Storage (If Implemented)
- [ ] Place a test order
- [ ] Check Supabase orders table for new entry
- [ ] Verify order_items are created correctly

## Pre-Deployment Checklist

### Code Quality
- [ ] No console errors
- [ ] No console warnings
- [ ] All linter errors fixed
- [ ] No TypeScript errors (if using TS)

### Build Test
- [ ] Run `npm run build` successfully
- [ ] Verify build completes without errors
- [ ] Check build folder size (should be reasonable)

### Environment Variables
- [ ] Verify `.env` file is in `.gitignore`
- [ ] Set environment variables in Vercel dashboard:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_ANON_KEY`

### Vercel Deployment
- [ ] Connect GitHub repository to Vercel
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `build`
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy and verify site loads
- [ ] Test all functionality on deployed site

### Final Verification
- [ ] All test cases pass
- [ ] Site is fully functional
- [ ] No broken links
- [ ] All images load
- [ ] Mobile responsive
- [ ] Cross-browser compatible

## Quick Test Script

Run these in browser console to verify:

```javascript
// Test 1: Check if products are loaded
console.log('Products:', window.products || 'Check products.js');

// Test 2: Check localStorage
console.log('Cart:', localStorage.getItem('levryn_cart'));

// Test 3: Check Supabase connection (if implemented)
// This would need to be exposed in your app
```

## Common Issues to Check

1. **Images not loading**: Check file paths and extensions (.png vs .jpg)
2. **Cart not persisting**: Check localStorage is enabled
3. **Supabase errors**: Verify credentials in .env
4. **Routing issues**: Check all routes are defined in App.js
5. **Styling issues**: Verify CSS files are imported correctly

