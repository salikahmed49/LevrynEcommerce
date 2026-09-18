# 🎯 Complete Guide to Running Ads for Levryn

## 📊 Overview

This guide covers everything you need to know about running effective advertising campaigns for your Levryn perfume e-commerce website.

---

## 🚀 Advertising Platforms (Ranked by Priority)

### **1. Meta Ads (Facebook & Instagram) - HIGHEST PRIORITY** ⭐⭐⭐⭐⭐

**Why Meta Ads?**
- Visual platform perfect for perfume products
- Instagram is ideal for luxury/lifestyle products
- Precise targeting (age, gender, interests, location)
- Lower cost per click than Google Ads
- Great for brand awareness and direct sales

**Budget Recommendation:** Rs. 15,000 - 30,000/month to start

---

### **2. Google Ads (Search & Shopping)** ⭐⭐⭐⭐

**Why Google Ads?**
- Capture high-intent buyers searching for perfumes
- Shopping ads show product images in search results
- Target specific keywords like "luxury perfume Pakistan"
- Pay only when someone clicks

**Budget Recommendation:** Rs. 20,000 - 40,000/month

---

### **3. TikTok Ads** ⭐⭐⭐

**Why TikTok?**
- Rapidly growing in Pakistan
- Younger demographic (18-35)
- Video content performs well
- Lower competition than Meta/Google

**Budget Recommendation:** Rs. 10,000 - 20,000/month

---

## 📱 Meta Ads (Facebook & Instagram) Setup

### **Step 1: Create Meta Business Account**

1. Go to [business.facebook.com](https://business.facebook.com)
2. Click "Create Account"
3. Enter business name: "Levryn Perfumes"
4. Add your business details

### **Step 2: Install Meta Pixel**

**What is Meta Pixel?**
- Tracks website visitors
- Measures ad performance
- Creates retargeting audiences
- Optimizes ad delivery

**Implementation:**

Add this code to `public/index.html` (before `</head>`):

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID'); // Replace with your Pixel ID
fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"/>
</noscript>
```

**Get Your Pixel ID:**
1. Go to Meta Events Manager
2. Click "Connect Data Sources" → "Web"
3. Choose "Meta Pixel"
4. Copy your Pixel ID

### **Step 3: Set Up Conversion Tracking**

Add to `src/utils/metaPixel.js`:

```javascript
// Meta Pixel Tracking
export const trackMetaEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

// Track product view
export const trackMetaProductView = (product) => {
  trackMetaEvent('ViewContent', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'PKR'
  });
};

// Track add to cart
export const trackMetaAddToCart = (product) => {
  trackMetaEvent('AddToCart', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'PKR'
  });
};

// Track purchase
export const trackMetaPurchase = (orderNumber, total, items) => {
  trackMetaEvent('Purchase', {
    value: total,
    currency: 'PKR',
    content_type: 'product',
    content_ids: items.map(item => item.id),
    num_items: items.length
  });
};
```

### **Step 4: Create Your First Ad Campaign**

**Campaign Structure:**
```
Campaign (Objective: Sales)
  ↓
Ad Set (Audience, Budget, Schedule)
  ↓
Ad (Creative, Copy, CTA)
```

**Recommended Campaign Settings:**

**1. Campaign Level:**
- Objective: **Sales** (Conversions)
- Campaign Name: "Levryn - Product Sales"

**2. Ad Set Level:**
- **Audience:**
  - Location: Pakistan (or specific cities: Karachi, Lahore, Islamabad)
  - Age: 25-45
  - Gender: All (or target based on product)
  - Interests: Luxury goods, Fashion, Beauty, Perfume
  
- **Budget:**
  - Daily Budget: Rs. 500 - 1,000 to start
  - Or Lifetime Budget: Rs. 15,000 for 30 days

- **Placements:**
  - Automatic Placements (recommended)
  - Or Manual: Facebook Feed, Instagram Feed, Instagram Stories

**3. Ad Level:**
- **Format:** Single Image or Carousel
- **Primary Text:** (See examples below)
- **Headline:** "Shop Luxury Perfumes"
- **Call to Action:** "Shop Now"
- **Destination:** Your website URL

---

## 📝 Ad Copy Examples

### **Ad Copy 1: Luxury Focus**
```
✨ Experience True Luxury ✨

Discover Levryn's collection of premium perfumes - 
meticulously crafted renditions of world-renowned fragrances.

🌟 Artisanal Quality
💎 Affordable Luxury
🚚 Fast Delivery Across Pakistan

Limited time offer: 20% OFF on first order!

👉 Shop Now: www.levryn.com
```

### **Ad Copy 2: Product-Specific**
```
Introducing: Coco by Levryn 🌸

Our rendition of the iconic Chanel Coco Mademoiselle

Top Notes: Orange, Bergamot
Heart: Rose, Jasmine
Base: Patchouli, Vanilla

NOW Rs. 1,800 (was Rs. 2,250)
50ml | Premium Quality | Fast Shipping

Order Today →
```

### **Ad Copy 3: Social Proof**
```
⭐⭐⭐⭐⭐ Rated 5/5 by 500+ Customers

"Best perfume I've ever bought! Lasts all day and smells amazing."
- Sarah K., Karachi

Discover why thousands trust Levryn for luxury fragrances.

🎁 Free Gift Wrapping
📦 Cash on Delivery Available
✅ 100% Authentic

Shop the Collection →
```

---

## 🎯 Google Ads Setup

### **Step 1: Create Google Ads Account**

1. Go to [ads.google.com](https://ads.google.com)
2. Click "Start Now"
3. Set up billing (credit card or bank account)

### **Step 2: Campaign Types**

**A. Google Search Ads**
- Show ads when people search for perfumes
- Keywords: "luxury perfume Pakistan", "buy perfume online", "designer perfume"

**B. Google Shopping Ads**
- Show product images in search results
- Requires Google Merchant Center setup

**C. Display Ads**
- Banner ads on websites
- Good for retargeting

### **Step 3: Keyword Research**

**High-Intent Keywords:**
- "buy perfume online Pakistan"
- "luxury perfume Karachi"
- "designer perfume renditions"
- "Chanel perfume Pakistan"
- "Dior perfume online"

**Use Keyword Planner:**
1. Go to Google Ads → Tools → Keyword Planner
2. Enter your keywords
3. See search volume and competition

### **Step 4: Create Search Campaign**

**Campaign Settings:**
- Campaign Type: Search
- Goal: Sales
- Budget: Rs. 500-1,000/day
- Location: Pakistan
- Language: English, Urdu

**Ad Groups:**
- Group 1: Luxury Perfumes
- Group 2: Specific Brands (Chanel, Dior, etc.)
- Group 3: Product Types (Men's, Women's)

**Ad Example:**
```
Headline 1: Luxury Perfumes Pakistan
Headline 2: Premium Quality | Fast Delivery
Headline 3: Shop Levryn Collection

Description 1: Discover artisanal perfumes crafted with precision. Renditions of world-famous fragrances at affordable prices.
Description 2: Free shipping on orders over Rs. 3,000. Cash on delivery available.

Final URL: https://www.levryn.com
```

---

## 💰 Budget Recommendations

### **Starter Budget (Rs. 30,000/month)**
- Meta Ads: Rs. 20,000 (67%)
- Google Search: Rs. 10,000 (33%)

### **Growth Budget (Rs. 60,000/month)**
- Meta Ads: Rs. 30,000 (50%)
- Google Search: Rs. 20,000 (33%)
- Google Shopping: Rs. 10,000 (17%)

### **Scale Budget (Rs. 100,000+/month)**
- Meta Ads: Rs. 40,000 (40%)
- Google Search: Rs. 30,000 (30%)
- Google Shopping: Rs. 20,000 (20%)
- TikTok Ads: Rs. 10,000 (10%)

---

## 📊 Measuring Success

### **Key Metrics to Track:**

**1. ROAS (Return on Ad Spend)**
- Formula: Revenue / Ad Spend
- Target: 3:1 minimum (Rs. 3 revenue for every Rs. 1 spent)

**2. Cost Per Purchase**
- Formula: Total Ad Spend / Number of Purchases
- Target: < 20% of average order value

**3. Click-Through Rate (CTR)**
- Meta Ads: 1-2% is good
- Google Search: 3-5% is good

**4. Conversion Rate**
- Website visitors who make a purchase
- Target: 2-4%

---

## 🎨 Creative Best Practices

### **Image Requirements:**

**Meta Ads:**
- Size: 1080 x 1080px (square) or 1080 x 1350px (vertical)
- Format: JPG or PNG
- Text: Less than 20% of image
- Show product clearly
- Use lifestyle images (person using perfume)

**Google Shopping:**
- Size: 800 x 800px minimum
- White background
- Product only (no lifestyle)
- High quality, clear image

### **Video Ads (Instagram Stories/Reels):**
- Length: 15-30 seconds
- Format: 9:16 (vertical)
- Hook in first 3 seconds
- Show product application
- Add captions (many watch without sound)

---

## 🔄 Retargeting Strategy

### **What is Retargeting?**
Show ads to people who visited your website but didn't buy.

### **Retargeting Audiences:**

**1. Website Visitors (Last 30 Days)**
- Show general product ads
- Offer: 10% discount code

**2. Cart Abandoners**
- Show specific products they added
- Offer: Free shipping

**3. Product Viewers**
- Show the exact product they viewed
- Add social proof/reviews

**4. Past Customers**
- Show new products
- Offer: Loyalty discount

---

## 📅 Campaign Timeline

### **Week 1-2: Setup & Testing**
- Install Meta Pixel
- Create ad accounts
- Launch 3-5 ad variations
- Budget: Rs. 500/day

### **Week 3-4: Optimization**
- Analyze performance
- Pause low-performing ads
- Increase budget on winners
- Budget: Rs. 750/day

### **Month 2+: Scaling**
- Launch retargeting campaigns
- Test new audiences
- Expand to Google Ads
- Budget: Rs. 1,000+/day

---

## ⚠️ Common Mistakes to Avoid

1. **Not tracking conversions** - Always set up pixel/tracking
2. **Targeting too broad** - Start narrow, expand later
3. **Poor product images** - Invest in good photography
4. **Ignoring mobile** - 80%+ traffic is mobile
5. **No retargeting** - You're leaving money on the table
6. **Giving up too soon** - Takes 2-4 weeks to optimize
7. **Not testing** - Always run A/B tests

---

## 🎓 Learning Resources

**Meta Ads:**
- [Meta Blueprint](https://www.facebook.com/business/learn) - Free courses
- Meta Ads Library - See competitor ads

**Google Ads:**
- [Google Skillshop](https://skillshop.withgoogle.com) - Free certification
- Google Ads Help Center

**General:**
- YouTube: "Shopify Ads Tutorial"
- YouTube: "E-commerce Facebook Ads"

---

## 📞 Next Steps

### **Immediate Actions:**
1. ✅ Create Meta Business Account
2. ✅ Install Meta Pixel on website
3. ✅ Set up Google Ads account
4. ✅ Prepare 5-10 product images
5. ✅ Write 3-5 ad copy variations
6. ✅ Set initial budget (Rs. 15,000-30,000)

### **Week 1:**
1. Launch first Meta campaign
2. Monitor daily performance
3. Adjust targeting based on results

### **Week 2-4:**
1. Optimize based on data
2. Launch Google Search campaign
3. Set up retargeting

---

## 💡 Pro Tips

1. **Start Small:** Test with Rs. 500/day before scaling
2. **Focus on One Platform:** Master Meta before adding Google
3. **Use Video:** Video ads often outperform images
4. **Leverage Instagram:** Perfect for luxury products
5. **Seasonal Campaigns:** Eid, Valentine's Day, Mother's Day
6. **Influencer Partnerships:** Combine with paid ads
7. **WhatsApp Integration:** Add WhatsApp button to ads

---

## 🎯 Expected Results

**Month 1:**
- ROAS: 1.5-2:1 (learning phase)
- 50-100 website visitors/day from ads
- 5-15 sales from ads

**Month 2-3:**
- ROAS: 2.5-3.5:1 (optimized)
- 150-300 website visitors/day
- 20-40 sales from ads

**Month 4+:**
- ROAS: 3-5:1 (scaled)
- 300-500+ website visitors/day
- 40-80+ sales from ads

---

**Ready to start advertising?** 🚀

Begin with Meta Ads, track everything with your Google Analytics (already set up!), and scale what works!

*Last updated: January 18, 2026*
