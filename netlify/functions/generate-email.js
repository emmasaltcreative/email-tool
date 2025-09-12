import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { buildSystemPrompt } from "../../lib/prompt.js";

// ✅ Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function handler(event) {
  try {
    // Parse incoming request
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const { brief } = body;

    if (!brief) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing 'brief' in request body" }),
      };
    }

    // Build system prompt
    const systemPrompt = buildSystemPrompt(brief);

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: brief },
      ],
    });

    const output = completion.choices[0].message.content;

    // Save email to Supabase
    const { error: dbError } = await supabase.from("emails").insert([
      {
        brief,
        content: output,
        created_at: new Date().toISOString(),
      },
    ]);

    if (dbError) {
      console.error("❌ Supabase insert error:", dbError.message);
    }

    // Success
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        email: output,
      }),
    };
  } catch (error) {
    console.error("❌ Function error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
