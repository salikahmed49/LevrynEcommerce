# Levryn Luxury Perfumes — Next.js Revamp & Complete Project Context

> **Note**: This document serves as the complete source of truth and architectural reference for the Levryn E-Commerce platform, preserving all context, design decisions, server-side configurations, and implementation steps.

---

## 1. Executive Summary & Architecture Migration

The platform has been transitioned from a client-side Single-Page Application (Create React App `react-scripts 5.0.1`) to **Next.js 14 (App Router)** with Server-Side Rendering (SSR) and Static Site Generation (SSG).

### Key Architectural Improvements
1. **Server-Side Crawlability**: Replaced the empty `<div id="root"></div>` shell with pre-rendered semantic HTML. Social scrapers (WhatsApp, Facebook, Instagram), Googlebot, Bingbot, and AI crawlers now receive full page content instantly.
2. **Shopify Luxury Aesthetic**: Engineered an editorial, whitespace-disciplined layout inspired by high-end fragrance houses (Le Labo, Byredo).
3. **Server-Side Security & Price Validation**: Product prices, sizes, and shipping thresholds are recalculated and validated authoritatively on the server. Clients cannot tamper with order totals.
4. **Data Privacy**: Customer contact details are protected via strict Supabase Row Level Security (RLS) policies and rate limiting. Public access to order lists is denied.

---

## 2. Brand Identity & Preserved Original Details

### 2.1 Brand Story & The Artisan's Pledge (`/about`)
- **Founder & Creator**: **Salik Ahmed Bhatti**
- **Vision**: "The Art of Accessible Luxury" — bridging high-end perfumery with authentic hand-craftsmanship.
- **Pledge**: Every scent is measured, blended, and bottled by hand, offering both *Iconic Renditions* of classic fragrance masterpieces and *Original Creations* formulated in-house.

### 2.2 Official Contact Channels (`/contact`)
- **Email**: [`info@levryn.com`](mailto:info@levryn.com)
- **Phone**: [`+92 327 2332833`](tel:+923272332833)
- **WhatsApp**: [`+92 327 2332833`](https://wa.me/923272332833)
- **Instagram**: [`@levryn__`](https://www.instagram.com/levryn__/)
- **Facebook**: [`Levryn`](https://www.facebook.com/profile.php?id=61580660576348)

---

## 3. SEO, Metadata & Compliance Audit Fixes

| Item | Previous State | Revamped Solution |
| :--- | :--- | :--- |
| **Title Tag** | Truncated at 85 chars (`Buy Luxury Perfumes Online in Pakistan \| Levryn - Designer Fragrances from Rs. 1,200`) | Clean 49 chars: **`Levryn \| Luxury Perfumes in Pakistan from Rs. 1,200`** |
| **Open Graph Image** | Low-res square `logo.png` (weak preview on WhatsApp & Meta) | Edge-rendered dynamic 1200×630 Open Graph card at `/opengraph-image` with `#2F4F4F` slate gradient and gold typography. |
| **Canonical Normalization** | Inconsistent trailing slashes and www/non-www targets | Normalized to **`https://www.shoplevryn.com`** via hosting layer (`vercel.json`) and Next.js `metadataBase`. |
| **Meta Keywords Tag** | Trademark names (Chanel, Dior, Creed Aventus dupe) risking ad account bans | **Removed entirely**. Replaced with compliant olfactory family descriptions (*"Smoky Birch & Crisp Apple"*, *"Turkish Rose & Mandarin"*) with a disclaimer in the footer. |
| **Structured Data** | None on dynamic routes | Valid JSON-LD Schema: `OnlineStore`, `Product`, and `BreadcrumbList`. |

---

## 4. UI/UX Design System (The "Shopify Look")

### 4.1 Design Tokens (`src/app/globals.css`)
- **Primary Color**: `#2F4F4F` (Deep Slate Green)
- **Accent Color**: `#C5A059` (Muted Warm Gold)
- **Neutrals**: `#FFFFFF` (Surface), `#F8F9F9` (Soft Background), `#1E2B28` (Luxe Dark Footer)
- **Typography**: 
  - Headings: `Cormorant Garamond` (Classic editorial serif)
  - Body & UI: `Plus Jakarta Sans` (Clean geometric sans-serif)
- **Spacing Scale**: Strict 8px increment scale (`8px, 16px, 24px, 32px, 48px, 64px, 96px`)
- **Borders & Curves**: `1px solid rgba(47, 79, 79, 0.12)`, subtle `4px - 8px` rounded corners.

### 4.2 Core Components & Structure
1. **Announcement Bar** (`src/components/AnnouncementBar.js`): Slim top bar highlighting complimentary delivery over Rs. 3,500.
2. **Header** (`src/components/Header.js`): Clean brand mark **LEVRYN** (removed "PARFUMS" per instruction), accord navigation links, search dropdown, and sliding cart bag trigger with badge counter.
3. **Cart Drawer** (`src/components/CartDrawer.js`): Off-canvas slide-in drawer from the right with a free-delivery progress bar, quantity increment/decrement controls, live subtotal, and direct "Proceed to Checkout" button.
4. **Product Card** (`src/components/ProductCard.js`): 4-column desktop / 2-column mobile layout with flacon presentation, fragrance family tag, size selector pills, price, and Quick Add button.
5. **Perfume Silhouette Placeholder** (`src/components/PerfumeBottlePlaceholder.js`): Custom SVG flacon silhouette rendering the brand label until you upload your new product photography.
6. **Social Icons** (`src/components/SocialIcons.js`): Lightweight SVG components for Instagram and Facebook without third-party dependencies.
7. **Footer** (`src/components/Footer.js`): Comprehensive footer featuring brand ethos, collection links, customer care, direct social connections, and legal trademark disclaimer.

---

## 5. Product Detail Page (PDP) Experience

Located at `src/app/products/[slug]/page.js`:
- **Left Column**: Multi-angle flacon presentation with concentration badge.
  - *Cleaned per instruction*: Removed redundant value highlight boxes (35% oil ratio, fast shipping, and HBL transfer).
- **Right Column (Sticky Buy Box)**: Breadcrumb trail, title, scent subtitle, size selection pills (`30ml`, `50ml`, `100ml`), dynamic price calculation, quantity stepper, and primary "Add to Bag" button.
- **Delivery Reassurance**: Simple, clean note: *"Orders over Rs. 3,500 qualify for Complimentary Nationwide Delivery."* (No out-of-place HBL mentions).
- **Olfactory Accord Pyramid**:
  - **Top Notes**: Immediate impression (5–15 mins)
  - **Heart Notes**: Character and body
  - **Base Notes**: Enduring sillage and drydown
- **Authentic Customer Inquiry**: Direct WhatsApp consultation button with pre-filled fragrance name for personalized advice (zero fake star reviews or unverified claims).
- **Complementary Accords**: "You May Also Appreciate" 4-card product showcase.
- **Sticky Mobile Buy Bar**: Fixed bottom bar on mobile viewports for effortless ordering.

---

## 6. Secure Guest Checkout & Bank Transfer Engine

### 6.1 Server Configuration (`src/lib/config.js`)
The bank details are centrally defined on the server:
```javascript
export const BANK_CONFIG = {
  bankName: 'Habib Bank Limited (HBL)',
  accountNumber: '00857902268603',
  accountTitle: 'Salik Ahmed AA',
  bankCode: 'HBL',
  supportWhatsApp: '+923272332833',
  supportEmail: 'info@levryn.com',
};

export const SHIPPING_CONFIG = {
  freeDeliveryThreshold: 3500, // PKR
  standardDeliveryFee: 250,    // PKR
  currency: 'PKR',
};
```

### 6.2 Checkout Page (`src/app/checkout/page.js`)
- **Single-Page Minimal Form**: Full Name, WhatsApp Mobile (`03XX-XXXXXXX`), Email Address, Street Address, City dropdown, and optional Delivery Notes.
- **Bank Transfer Card**: Displays HBL details with a 1-click clipboard copy button and clear transfer instructions.
- **Server Price Protection**: Submits `{ name, phone, email, address, city, notes, items: [{ id, size, quantity }] }` to `POST /api/checkout`.
- **Order Confirmation & WhatsApp Receipt**: Displays order number (`LEV-XXXXXX`), verified amount to pay, copyable account number, and a direct button opening WhatsApp with pre-filled payment confirmation text.

### 6.3 Server Route (`src/app/api/checkout/route.js`)
- **Rate Limiting**: Sliding window tracking by client IP (max 10 requests per 10 minutes).
- **Field Validation**: Regex check for Pakistani phone numbers and emails.
- **Price Calculation**: Resolves every item against `src/lib/catalog.js`, verifying size availability and unit price. Calculates `subtotal + (subtotal >= 3500 ? 0 : 250)`.
- **Supabase Persistence**: Inserts into `orders` and `order_items` using server environment client.

### 6.4 Supabase Row Level Security (`supabase-revamped-schema.sql`)
- Enables RLS on `orders` and `order_items`.
- **Public `anon` Role**: Can **ONLY** `INSERT`. Reading (`SELECT`), modifying (`UPDATE`), or deleting (`DELETE`) orders is strictly prohibited. Customer private data cannot be scraped.
- **Authenticated Role**: Admins have full read/update permissions.

---

## 7. Complete Project File Tree

```
d:\LevrynFinal-main\
├── jsconfig.json                   # Path alias (@/* -> ./src/*)
├── next.config.mjs                 # Next.js config with security headers & trailingSlash: false
├── package.json                    # Next.js scripts (dev, build, start, lint)
├── vercel.json                     # Clean hosting config (cleanUrls, trailingSlash: false)
├── supabase-revamped-schema.sql    # Clean Supabase schema with strict RLS
├── NEXTJS_REVAMP_DOCUMENTATION.md  # This comprehensive documentation file
├── public/
│   ├── images/products/            # Directory to drop your new product photos
│   └── manifest.json
└── src/
    ├── app/
    │   ├── globals.css             # Unified 8px design system tokens & utilities
    │   ├── layout.js               # Root layout, metadataBase, JSON-LD Schema
    │   ├── page.js                 # Homepage (Hero, Categories, Best Sellers, Trust)
    │   ├── opengraph-image.js      # Dynamic 1200x630 social share preview
    │   ├── sitemap.js              # Dynamic XML sitemap generator
    │   ├── robots.js               # Dynamic robots.txt
    │   ├── about/page.js           # Salik Ahmed Bhatti story & Artisan's Pledge
    │   ├── contact/page.js         # Exact contact channels (Email, Phone, WhatsApp, IG, FB)
    │   ├── faq/page.js             # Ordering, shipping, and flacon guidelines
    │   ├── checkout/page.js        # Single-page guest checkout & HBL details
    │   ├── collections/[category]/page.js # 4-col/2-col catalog grid with sticky filters
    │   ├── products/[slug]/page.js # Full PDP with notes pyramid & sticky mobile buy bar
    │   └── api/checkout/route.js   # Secure checkout endpoint with price recalculation
    ├── components/
    │   ├── AnnouncementBar.js      # Slim top banner
    │   ├── Header.js               # Logo (LEVRYN), nav, search, cart trigger
    │   ├── CartDrawer.js           # AJAX slide-in cart with free-shipping bar
    │   ├── ProductCard.js          # Shopify-style product card with quick-add
    │   ├── PerfumeBottlePlaceholder.js # Editorial SVG flacon silhouette
    │   ├── SocialIcons.js          # Native SVG Instagram & Facebook icons
    │   └── Footer.js               # Clean brand footer with social links & legal disclaimer
    ├── context/
    │   └── CartContext.js          # Cart state, local storage persistence, drawer state
    └── lib/
        ├── config.js               # Authoritative server bank & shipping config
        ├── catalog.js              # Master catalog data & price calculation logic
        └── supabase.js             # Safe Supabase client with RLS separation
```

---

## 8. Instructions for Adding Your New Products & Images

### Step 1: Adding Product Images
Place your image files in `public/images/products/`:
- `outlands-1.jpg`, `outlands-2.jpg` (front shot + packaging or lifestyle angle)
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`.

### Step 2: Updating the Catalog
Open `src/lib/catalog.js` and edit or append to the `PRODUCTS` array:
```javascript
{
  id: 'lev-01',
  slug: 'outlands-extrait',
  name: 'Outlands',
  subtitle: 'Smoky Cardamom, Rich Amber & Earthy Patchouli',
  family: 'Woody & Oriental',
  gender: 'Unisex',
  concentration: 'Extrait de Parfum',
  description: 'A magnetic and untamed fragrance built around invigorating cardamom...',
  inspiration: 'Inspired by opulent oriental woody profiles',
  isBestSeller: true,
  isFeatured: true,
  sizes: [
    { size: '30ml', price: 2200, inStock: true },
    { size: '50ml', price: 3200, inStock: true },
    { size: '100ml', price: 5400, inStock: true },
  ],
  notes: {
    top: ['Calabrian Bergamot', 'Pink Pepper', 'Green Cardamom'],
    heart: ['French Lavender', 'Wild Geranium', 'Nutmeg'],
    base: ['Warm Amber', 'Mysore Sandalwood', 'Earthy Patchouli'],
  },
  images: ['/images/products/outlands-1.jpg', '/images/products/outlands-2.jpg'],
}
```

### Step 3: Run Database Migration
Copy the contents of `supabase-revamped-schema.sql` and run it in the **SQL Editor** of your Supabase dashboard. This wipes old test data and activates the secure RLS policies.

---

## 9. Development & Deployment Commands

- **Run Locally**:
  ```bash
  npm run dev
  ```
  Visit: `http://localhost:3000`
- **Verify Production Build**:
  ```bash
  npm run build
  ```
- **Start Production Server**:
  ```bash
  npm run start
  ```
