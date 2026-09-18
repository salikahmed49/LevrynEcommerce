const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const reviewsToAdd = [
  // Anas Farrukh reviews
  {
    product_id: 5,
    product_name: "Office",
    reviewer_name: "Anas Farrukh",
    rating: 5,
    title: "Perfect for daily wear",
    review_text: "Absolutely love the professional vibe. It lasts all day and I get so many compliments at work.",
    approved: true, // Auto-approve
    verified_purchase: true,
  },
  {
    product_id: 10,
    product_name: "11z01",
    reviewer_name: "Anas Farrukh",
    rating: 5,
    title: "Incredible scent profile",
    review_text: "The smoky fruitiness is spot on. This rendition is top tier and performance is nuclear.",
    approved: true,
    verified_purchase: true,
  },
  {
    product_id: 15,
    product_name: "Arctic Frost",
    reviewer_name: "Anas Farrukh",
    rating: 4,
    title: "Super fresh!",
    review_text: "Very invigorating and cooling. Smells exactly like a high-end freshie. Great for summer.",
    approved: true,
    verified_purchase: true,
  },
  // Ayan Khan review
  {
    product_id: 11,
    product_name: "TK4",
    reviewer_name: "Ayan Khan",
    rating: 5,
    title: "Sophisticated masterpiece",
    review_text: "Extremely deep and complex fragrance. It draws people in. One of my favorite pickups from Levryn so far.",
    approved: true,
    verified_purchase: true,
  }
];

async function seedReviews() {
  console.log("Starting to seed reviews...");

  for (const review of reviewsToAdd) {
    const { data, error } = await supabase
      .from('product_reviews')
      .insert([review]);

    if (error) {
      console.error(`Error adding review for ${review.product_name}:`, error.message);
    } else {
      console.log(`Successfully added review by ${review.reviewer_name} for ${review.product_name}`);
    }
  }

  console.log("Finished seeding reviews!");
}

seedReviews();
