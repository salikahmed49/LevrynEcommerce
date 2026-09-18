# Levryn Ecommerce - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

#### Create a Supabase Project
1. Go to https://supabase.com and create a new project
2. Wait for the project to be fully initialized

#### Get Your Credentials
1. Go to Project Settings > API
2. Copy your "Project URL" and "anon public" key

#### Create Environment File
Create a `.env` file in the root directory:
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Set Up Database
1. In Supabase, go to SQL Editor
2. Copy and paste the contents of `supabase-setup.sql`
3. Run the SQL script
4. This will create the necessary tables and insert product data

### 3. Add Product Images

Create a `public/images` folder and add the following images:

**Required Images:**
- `outlands.jpg` - Outlands perfume (50ml)
- `coco.jpg` - Coco perfume (50ml)
- `althair.jpg` - Althair perfume (30ml) - small red bottle
- `office.jpg` - Office perfume (50ml)
- `issey.jpg` - Issey perfume (50ml)
- `cadenza.jpg` - Cadenza perfume (50ml)
- `11z01.jpg` - 11z01 perfume (50ml)
- `placeholder.jpg` - Placeholder image for products without images

**Note:** Medusa, Intensely, and Marshmallow will use the placeholder image until you add specific images.

### 4. Run the Application

```bash
npm start
```

The application will open at http://localhost:3000

## Features

### Home Page
- Hero section with brand messaging
- Featured "Best Sellers" section
- Quick navigation to products

### Products Page
- Full product catalog
- Filter by "Best Selling"
- Sort by:
  - Name (A-Z)
  - Price (Low to High)
  - Price (High to Low)

### Shopping Cart
- Add/remove products
- Update quantities
- View cart total
- Persistent cart (saved in localStorage)

### Checkout
- Customer information form
- Bank transfer payment option
- Voucher code system
- Order summary

## Voucher Codes

Test voucher codes:
- `LEVRYN10` - 10% discount
- `LEVRYN20` - 20% discount
- `WELCOME` - 15% discount

## Bank Transfer Details

The checkout page displays:
- Account Number: 00857902686003
- Bank: HBL
- Account Holder: Salik Ahmed AA

## Product Information

| Product | Price | Size | Best Selling |
|---------|-------|------|--------------|
| Outlands | $3,500 | 50ml | Yes |
| Coco | $2,250 | 50ml | Yes |
| Medusa | $2,250 | 50ml | No |
| Althair | $1,500 | 30ml | Yes |
| Office | $2,500 | 50ml | Yes |
| Issey | $1,700 | 50ml | No |
| Cadenza | $3,000 | 50ml | No |
| Intensely | $1,500 | 30ml | No |
| Marshmallow | $2,250 | 50ml | No |
| 11z01 | $3,500 | 50ml | No |

## Customization

### Change Currency
Edit `src/data/products.js` and replace `$` with your desired currency symbol in:
- `src/components/ProductCard.js`
- `src/pages/Cart.js`
- `src/pages/Checkout.js`

### Modify Theme Colors
Edit CSS variables in `src/App.css`:
```css
:root {
  --gold: #D4AF37;
  --gold-dark: #B8941F;
  --gold-light: #F4E4BC;
}
```

## Troubleshooting

### Images Not Loading
- Ensure images are in `public/images/` folder
- Check image file names match exactly (case-sensitive)
- Use placeholder.jpg for missing images

### Supabase Connection Issues
- Verify `.env` file has correct credentials
- Check Supabase project is active
- Ensure database tables are created

### Cart Not Persisting
- Check browser localStorage is enabled
- Clear browser cache and try again

## Production Build

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Support

For issues or questions, refer to the main README.md file.

