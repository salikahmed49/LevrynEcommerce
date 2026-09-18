const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newReviews = [
  {
    product_id: 3,
    product_name: "Medusa",
    reviewer_name: "Nitish",
    rating: 4,
    title: "Smells amazing, average projection",
    review_text: "Smells great, very fruity and fresh which I love. I just wish the loud projection lasted a bit longer after the 4-hour mark. Still a fantastic pickup for the price.",
    approved: true, verified_purchase: true
  },
  {
    product_id: 10,
    product_name: "11z01",
    reviewer_name: "Bilal Tariq",
    rating: 3,
    title: "Very smoky, slightly mature",
    review_text: "It's a very accurate smoky batch interpretation, but honestly, the heavy birch note is a bit too mature for my personal taste. If you love dark classic scents, you'll like it.",
    approved: true, verified_purchase: true
  },
  {
    product_id: 4,
    product_name: "Vanilla Candy",
    reviewer_name: "Rohan",
    rating: 4,
    title: "Extremely sweet",
    review_text: "Very sweet and cozy! It leans slightly feminine for my personal style because of the heavy tonka and vanilla, but my sister absolutely loves stealing it from me.",
    approved: true, verified_purchase: true
  },
  {
    product_id: 13,
    product_name: "Code",
    reviewer_name: "Saad Memon",
    rating: 3,
    title: "Good but subtle",
    review_text: "Good daily scent for the office, very clean lemon and anise. However, it sits quite close to the skin on me. It's perfect if you want something subtle and unoffensive.",
    approved: true, verified_purchase: true
  },
  {
    product_id: 1,
    product_name: "Outlands",
    reviewer_name: "Danish Ali",
    rating: 4,
    title: "A challenging masterpiece",
    review_text: "Extremely unique and earthy resinous scent. It's definitely not a safe blind buy since it's so complex, but if you appreciate highly intricate niche perfumery, you'll enjoy this.",
    approved: true, verified_purchase: true
  }
];

async function seedBatchReviews() {
  console.log(`Starting to seed ${newReviews.length} realistic reviews...`);

  for (const review of newReviews) {
    const { data, error } = await supabase
      .from('product_reviews')
      .insert([review]);

    if (error) {
      console.error(`❌ Error adding review for ${review.product_name} by ${review.reviewer_name}:`, error.message);
    } else {
      console.log(`✅ Successfully added review by ${review.reviewer_name} for ${review.product_name}`);
    }
  }

  console.log("🎉 Finished seeding realistic reviews!");
}

seedBatchReviews();
