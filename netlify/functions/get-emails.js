// netlify/functions/get-emails.js
import { supabase } from "../../lib/db.js";

export async function handler(event) {
  try {
    const { limit = 10 } = event.queryStringParameters;

    const { data, error } = await supabase
      .from("emails")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
