-- Create Supabase Analytics Table
-- Run this in Supabase SQL Editor

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  product_id TEXT,
  product_name TEXT,
  product_price NUMERIC,
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_product_id ON analytics_events(product_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics_events(session_id);

-- Enable Row Level Security
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for tracking)
CREATE POLICY "Allow public inserts" ON analytics_events
  FOR INSERT WITH CHECK (true);

-- Create policy to allow admin to view all analytics
CREATE POLICY "Allow admin to view analytics" ON analytics_events
  FOR SELECT USING (true);

-- Grant permissions
GRANT INSERT ON analytics_events TO anon;
GRANT SELECT ON analytics_events TO authenticated;
