// src/supabase.js
import { createClient } from "@supabase/supabase-js";

// ✅ Safe for browser (VITE_ vars are embedded at build time)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
