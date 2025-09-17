// lib/db.js
import { createClient } from "@supabase/supabase-js";

// ✅ Use secure service key (never expose this to frontend)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
