// netlify/functions/generate-email.js
import OpenAI from "openai";
import { supabase } from "../../lib/db.js";
import { buildSystemPrompt } from "../../lib/prompt.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const { brief } = body;

    if (!brief) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing 'brief' in request body" }),
      };
    }

    // 🧠 Generate email content
    const systemPrompt = buildSystemPrompt(brief);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: brief },
      ],
    });

    const output = completion.choices[0].message.content;

    // 💾 Save to Supabase
    await supabase.from("emails").insert({
      brief,
      content: output,
      created_at: new Date(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ email: output }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
