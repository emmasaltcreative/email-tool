import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function handler(event) {
  try {
    // Optional: limit results with query params
    const { limit } = event.queryStringParameters || {};

    const { data, error } = await supabase
      .from("emails")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit ? parseInt(limit) : 20); // default 20

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ emails: data }),
    };
  } catch (err) {
    console.error("❌ Error fetching emails:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
