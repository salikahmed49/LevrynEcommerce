# Levryn Ecommerce Website

A complete end-to-end ecommerce website for Levryn luxury perfumes built with React.js and Supabase.

## Features

- **Home Page**: Hero section with featured products
- **Products Page**: Full product catalog with filtering and sorting
- **Shopping Cart**: Add, remove, and update quantities
- **Checkout**: Complete checkout process with bank transfer option
- **Voucher System**: Apply discount vouchers at checkout
- **Responsive Design**: Fully mobile-responsive design
- **White & Golden Theme**: Elegant color scheme

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Supabase**
   - Create a Supabase project at https://supabase.com
   - Copy your Supabase URL and anon key
   - Create a `.env` file in the root directory:
     ```
     REACT_APP_SUPABASE_URL=your_supabase_url
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Set Up Database**
   - In Supabase, create a table called `products` with columns:
     - id (int8, primary key)
     - name (text)
     - price (numeric)
     - size (text)
     - image (text)
     - bestSelling (boolean)
     - description (text)

4. **Add Product Images**
   - Create a `public/images` folder
   - Add product images with these names:
     - outlands.jpg
     - coco.jpg
     - althair.jpg (small red bottle)
     - office.jpg
     - issey.jpg
     - cadenza.jpg
     - 11z01.jpg
     - placeholder.jpg (for Medusa, Intensely, Marshmallow)

5. **Run the Application**
   ```bash
   npm start
   ```

## Products

- Outlands - $3,500 (50ml)
- Coco - $2,250 (50ml)
- Medusa - $2,250 (50ml) - placeholder image
- Althair - $1,500 (30ml) - small red bottle
- Office - $2,500 (50ml)
- Issey - $1,700 (50ml)
- Cadenza - $3,000 (50ml)
- Intensely - $1,500 (30ml) - placeholder image
- Marshmallow - $2,250 (50ml) - placeholder image
- 11z01 - $3,500 (50ml)

## Voucher Codes

- LEVRYN10 - 10% discount
- LEVRYN20 - 20% discount
- WELCOME - 15% discount

## Bank Transfer Details

- Account Number: 00857902686003
- Bank: HBL
- Account Holder: Salik Ahmed AA

## Technologies Used

- React.js
- React Router
- Supabase
- CSS3
- LocalStorage (for cart persistence)

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/          # Page components
  ├── context/        # React context (Cart)
  ├── data/           # Product data
  ├── config/         # Configuration files
  └── App.js          # Main app component
```

