import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function saveEmail({ brief, email }) {
  const { data, error } = await supabase
    .from("emails")
    .insert([{ brief, email }]);

  if (error) {
    console.error("Supabase error:", error.message);
  }

  return data;
}
