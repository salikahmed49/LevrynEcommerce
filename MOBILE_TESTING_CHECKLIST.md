# Mobile Testing Checklist - Levryn Platform

## 📱 Device Testing Matrix

### Required Devices
- [ ] iPhone SE (375px) - Smallest common iOS device
- [ ] iPhone 13/14 (390px) - Most popular iPhone
- [ ] Samsung Galaxy S21 (360px) - Common Android
- [ ] iPad (768px) - Tablet view

### Browsers to Test
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Chrome (iOS)
- [ ] Samsung Internet (Android)

---

## ✅ Visual & Layout Tests

### Homepage
- [ ] Hero section displays correctly
- [ ] "LEVRYN" title is readable
- [ ] CTA button is 48px height
- [ ] Best Sellers grid shows 1 column on mobile
- [ ] Product cards don't overflow screen
- [ ] Images load with lazy loading
- [ ] Skeleton loaders appear briefly
- [ ] No horizontal scroll

### Products Page
- [ ] Filter dropdowns are 100% width
- [ ] Sort dropdown is 100% width
- [ ] Products grid shows 1 column
- [ ] Product images maintain aspect ratio
- [ ] Best Seller badges visible
- [ ] Out of Stock badges visible (if applicable)
- [ ] Prices display with "Rs." prefix
- [ ] Add to Cart buttons are 48px height

### Product Detail Page
- [ ] Back button is easily tappable
- [ ] Product image fills width properly
- [ ] Image has lazy loading
- [ ] Product name (H1) is prominent
- [ ] Rendition text is visible
- [ ] Description is readable
- [ ] Fragrance notes section displays well
- [ ] Size selector buttons stack vertically
- [ ] Selected size is highlighted
- [ ] Price updates when size changes
- [ ] Add to Cart button is 48px height
- [ ] Out of stock sizes are disabled
- [ ] Best Seller badge shows (if applicable)

### Cart Page
- [ ] Cart items display in list format
- [ ] Product images are visible
- [ ] Quantity controls are easy to tap
- [ ] Remove button is accessible
- [ ] Total is clearly visible
- [ ] Checkout button is 48px height
- [ ] Empty cart message displays correctly

### Checkout Page
- [ ] All form inputs are 100% width
- [ ] All form inputs are 48px height
- [ ] No zoom on input focus (16px font)
- [ ] Form fields stack vertically
- [ ] Bank account number is readable
- [ ] Copy button works (test clipboard)
- [ ] Copy button is 48px height
- [ ] Voucher input + button stack on mobile
- [ ] Order summary is below form (not sidebar)
- [ ] Submit button is 48px height
- [ ] Loading state shows "Processing..."

### Success Modal (After Order)
- [ ] Modal is centered and readable
- [ ] Success icon displays
- [ ] Order number is visible
- [ ] Total amount is prominent
- [ ] Instructions list is readable
- [ ] WhatsApp button is 48px height
- [ ] WhatsApp button opens app
- [ ] Message is pre-filled correctly
- [ ] Back to Home button works

### Track Order Page
- [ ] Page title is visible
- [ ] Input field is 100% width
- [ ] Input field is 48px height
- [ ] Track button is 48px height
- [ ] Timeline displays horizontally (scrollable if needed)
- [ ] Timeline dots are visible
- [ ] Status labels are readable
- [ ] Order details cards stack vertically
- [ ] Customer info is readable
- [ ] Order items list displays well
- [ ] Total amount is prominent

### Admin Dashboard (Mobile Admin)
- [ ] Header stacks vertically
- [ ] Logout button is 100% width
- [ ] Stats cards stack vertically (1 column)
- [ ] Stats icons are visible
- [ ] Stats values are readable
- [ ] Orders list displays well
- [ ] Order cards are readable
- [ ] Status dropdown is 100% width
- [ ] Customer info is readable
- [ ] Order items display properly
- [ ] Repeat customer badge shows

---

## 🎯 Interaction Tests

### Touch Targets
- [ ] All buttons are at least 48px height
- [ ] Buttons have adequate spacing (no accidental taps)
- [ ] Links are easy to tap
- [ ] Form inputs are easy to tap
- [ ] Dropdowns are easy to open

### Forms
- [ ] Keyboard doesn't cover input fields
- [ ] Can scroll to see submit button
- [ ] Autocomplete works (name, email, phone)
- [ ] Validation errors are visible
- [ ] Error messages don't break layout
- [ ] Can submit form without issues

### Navigation
- [ ] Header navigation works
- [ ] Back buttons work
- [ ] Product links work
- [ ] Cart icon shows badge
- [ ] Footer links work

### Images
- [ ] Images load progressively
- [ ] Skeleton loaders show while loading
- [ ] Images don't cause layout shift
- [ ] Placeholder images work if image fails
- [ ] Lazy loading works (images load as you scroll)

---

## 🚀 Performance Tests

### Load Times
- [ ] Homepage loads in < 3 seconds
- [ ] Products page loads in < 3 seconds
- [ ] Product detail loads in < 2 seconds
- [ ] Images appear quickly
- [ ] No long white screens

### Scrolling
- [ ] Smooth scrolling (no jank)
- [ ] Images load as you scroll
- [ ] No layout shifts while scrolling
- [ ] Sticky elements work (if any)

### Animations
- [ ] Skeleton loaders animate smoothly
- [ ] Button hover states work (on tap)
- [ ] Transitions are smooth
- [ ] No janky animations

---

## 🔧 Functionality Tests

### Add to Cart
- [ ] Can add product from product card
- [ ] Can add product from detail page
- [ ] Cart badge updates immediately
- [ ] Can add multiple products
- [ ] Can add same product multiple times
- [ ] Out of stock products can't be added
- [ ] Alert shows for out of stock items

### Cart Management
- [ ] Can increase quantity
- [ ] Can decrease quantity
- [ ] Can remove items
- [ ] Cart persists on page reload
- [ ] Total updates correctly
- [ ] Can proceed to checkout

### Checkout Flow
- [ ] Can fill all form fields
- [ ] Validation works
- [ ] Can apply voucher code
- [ ] Voucher discount applies
- [ ] Can copy bank account number
- [ ] Can submit order
- [ ] Success modal appears
- [ ] WhatsApp button works
- [ ] WhatsApp message is correct
- [ ] Cart clears after order

### Order Tracking
- [ ] Can enter order number
- [ ] Can submit tracking form
- [ ] Order details display
- [ ] Timeline shows correct status
- [ ] All order info is visible
- [ ] Error shows for invalid order number

### Admin Dashboard
- [ ] Can login
- [ ] Stats display correctly
- [ ] Orders list loads
- [ ] Can change order status
- [ ] Stats update after status change
- [ ] Repeat customer badge shows
- [ ] Can logout

---

## 🐛 Edge Cases & Error Handling

### Network Issues
- [ ] Graceful error if no internet
- [ ] Retry mechanism works
- [ ] Error messages are clear
- [ ] Can recover from errors

### Empty States
- [ ] Empty cart shows message
- [ ] No products shows message
- [ ] No orders shows message (admin)
- [ ] Invalid order number shows error

### Validation
- [ ] Required fields show errors
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Invalid voucher shows error

### Out of Stock
- [ ] Badge shows on product card
- [ ] Button is disabled
- [ ] Alert shows when trying to add
- [ ] Can't proceed with out of stock items

---

## 📊 SEO & Meta Tags (Mobile)

### View Source
- [ ] Title tag is present
- [ ] Meta description is present
- [ ] Open Graph tags are present
- [ ] JSON-LD structured data is present
- [ ] Alt tags on all images

### Social Sharing
- [ ] Share on WhatsApp shows preview
- [ ] Share on Facebook shows preview
- [ ] Share on Twitter shows preview

---

## 🎨 Visual Polish

### Typography
- [ ] All text is readable (min 14px)
- [ ] Headings are prominent
- [ ] Line height is comfortable
- [ ] No text overflow

### Colors
- [ ] Gold color is visible
- [ ] Contrast is sufficient
- [ ] Status colors are clear
- [ ] Badges are readable

### Spacing
- [ ] Adequate padding around elements
- [ ] Consistent gaps between sections
- [ ] No cramped layouts
- [ ] No excessive whitespace

### Shadows & Borders
- [ ] Cards have subtle shadows
- [ ] Buttons have depth
- [ ] Borders are visible but not harsh

---

## 🔒 Security & Privacy

### Admin Access
- [ ] Can't access admin without login
- [ ] Redirects to login if unauthorized
- [ ] Can logout successfully

### Data Privacy
- [ ] No sensitive data in console logs (except debug mode)
- [ ] Order numbers are not sequential/guessable
- [ ] Customer data is not exposed

---

## 📝 Testing Notes Template

### Device: _______________
### Browser: _______________
### Date: _______________

#### Issues Found:
1. _______________________________
2. _______________________________
3. _______________________________

#### Screenshots:
- [ ] Attached

#### Severity:
- [ ] Critical (blocks functionality)
- [ ] High (major UX issue)
- [ ] Medium (minor issue)
- [ ] Low (cosmetic)

---

## ✅ Final Checklist

### Before Declaring "Mobile Ready"
- [ ] Tested on at least 2 different iOS devices
- [ ] Tested on at least 2 different Android devices
- [ ] Tested on tablet (iPad or Android tablet)
- [ ] All critical flows work (browse → cart → checkout → order)
- [ ] No horizontal scrolling anywhere
- [ ] All buttons are easily tappable
- [ ] All forms are easy to fill
- [ ] Images load properly
- [ ] Performance is acceptable (< 3s load)
- [ ] No console errors
- [ ] WhatsApp integration works
- [ ] Order tracking works
- [ ] Admin dashboard works on mobile

### Sign-Off
- [ ] Tested by: _______________
- [ ] Date: _______________
- [ ] Approved for production: Yes / No

---

## 🚨 Critical Issues to Watch For

### Common Mobile Issues
1. **Zoom on Input Focus**: Should NOT happen (16px font prevents this)
2. **Horizontal Scroll**: Should NEVER happen
3. **Tiny Buttons**: All buttons should be 48px height minimum
4. **Overlapping Elements**: Check all pages for overlaps
5. **Cut-off Text**: Ensure all text is fully visible
6. **Slow Loading**: Images should load quickly with lazy loading
7. **Layout Shifts**: Images should not cause content to jump
8. **Keyboard Covering Inputs**: Should be able to scroll to see inputs

### Quick Fixes
- If zoom happens: Check font-size is 16px or larger
- If horizontal scroll: Check for fixed widths, use 100% or max-width
- If buttons too small: Use .btn class (48px height)
- If layout shifts: Use aspect-ratio on images
- If slow loading: Verify lazy loading is enabled

---

## 📞 Report Issues

### How to Report
1. Take screenshot
2. Note device and browser
3. Describe steps to reproduce
4. Note expected vs actual behavior
5. Check console for errors

### Priority Levels
- **P0 (Critical)**: Blocks checkout/order - Fix immediately
- **P1 (High)**: Major UX issue - Fix before launch
- **P2 (Medium)**: Minor issue - Fix if time permits
- **P3 (Low)**: Cosmetic - Nice to have

---

*Test thoroughly, ship confidently! 🚀*
