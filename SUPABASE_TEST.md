# Supabase Connection Testing Guide

## How to Verify Supabase is Working

### Method 1: Browser Console Check

1. Open your website in browser
2. Press F12 to open DevTools
3. Go to Console tab
4. Check for any Supabase-related errors
5. Go to Network tab
6. Look for requests to `*.supabase.co` domain

### Method 2: Test Supabase Connection

Create a test file `src/utils/testSupabase.js`:

```javascript
import { supabase } from '../config/supabase';

export const testSupabaseConnection = async () => {
  try {
    // Test 1: Fetch products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (productsError) {
      console.error('Products fetch error:', productsError);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('Sample product:', products);
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
};
```

Add this to your App.js temporarily:

```javascript
import { testSupabaseConnection } from './utils/testSupabase';

// In useEffect or componentDidMount
useEffect(() => {
  testSupabaseConnection();
}, []);
```

### Method 3: Supabase Dashboard Check

1. Go to https://supabase.com
2. Log in to your project
3. Go to **Table Editor**
4. Verify tables exist:
   - `products` (should have 11 rows)
   - `orders` (empty initially)
   - `order_items` (empty initially)
5. Go to **SQL Editor**
6. Run: `SELECT COUNT(*) FROM products;`
7. Should return 11

### Method 4: Test Product Fetch

In browser console, if Supabase is properly connected:

```javascript
// This will only work if you expose supabase client
// Or add this to a component temporarily
import { supabase } from './config/supabase';

supabase
  .from('products')
  .select('*')
  .then(({ data, error }) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Products:', data);
    }
  });
```

## Current Status

**Note**: The application currently uses **local product data** from `src/data/products.js`. Supabase is set up but **not actively used** for fetching products. It's ready for:
- Storing orders when checkout is implemented
- Future product management
- Order tracking

## To Enable Supabase Product Fetching

If you want to fetch products from Supabase instead of local data:

1. Update `src/pages/Products.js`:
```javascript
import { supabase } from '../config/supabase';
import { useState, useEffect } from 'react';

const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
  };
  
  fetchProducts();
}, []);
```

## Environment Variables Check

Verify your `.env` file (or Vercel environment variables):

```bash
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: 
- Don't commit `.env` to Git
- Add environment variables in Vercel dashboard for production
- Variable names must start with `REACT_APP_` for Create React App

## Supabase Setup Verification Checklist

- [ ] Supabase project created
- [ ] Database tables created (run `supabase-setup-updated.sql`)
- [ ] 11 products inserted into database
- [ ] Row Level Security policies set
- [ ] Environment variables set in `.env`
- [ ] Environment variables set in Vercel (for production)
- [ ] No connection errors in browser console
- [ ] Can query products from Supabase dashboard

## Troubleshooting

### Issue: "Invalid API key"
- **Solution**: Check your `REACT_APP_SUPABASE_ANON_KEY` is correct
- Get it from: Supabase Dashboard > Settings > API > anon public key

### Issue: "Failed to fetch"
- **Solution**: Check your `REACT_APP_SUPABASE_URL` is correct
- Get it from: Supabase Dashboard > Settings > API > Project URL

### Issue: "relation does not exist"
- **Solution**: Run the SQL setup script in Supabase SQL Editor
- File: `supabase-setup-updated.sql`

### Issue: "new row violates row-level security policy"
- **Solution**: Check RLS policies are set correctly
- The setup SQL includes policies for public access

