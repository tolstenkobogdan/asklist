import { createBrowserClient } from '@supabase/ssr';

let client;

// One browser client per tab. Only the public URL + publishable (anon) key are used here.
export function getSupabase() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return client;
}
