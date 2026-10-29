import { createClient } from '@supabase/supabase-js';

// Support both Next.js (NEXT_PUBLIC_*) and legacy Create React App (REACT_APP_*) environment variables
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.REACT_APP_SUPABASE_URL ||
  'https://zuhwdbwofigycpzhbine.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1aHdkYndvZmlneWNwemhiaW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMjE2MjMsImV4cCI6MjA4MDY5NzYyM30.Q1hgHO5Kkw0Sf0HqjJHFOkvO0muFLBoUmt4AtL5BpFQ';

// Client-safe singleton for public reads/anon inserts with RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only helper (used exclusively inside API routes or server actions)
export function getSupabaseServerClient() {
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY;

  if (serviceKey) {
    return createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });
  }
  // Fallback to anon client (governed by Row Level Security)
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}
