require('dotenv').config();
const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function optimizeListing(productData) {
  console.log(`[AI Service] Optimizing listing for ASIN: ${productData.asin}`);

  const prompt = `
You are an expert Amazon listing optimizer.
Rewrite the following product details to be keyword-rich, compliant, and persuasive.

Original Title: ${productData.original_title}
Original Bullet Points: ${productData.original_bullets.join('\n')}
Original Description: ${productData.original_description}

Return a clean JSON object with this structure (NO markdown, NO backticks):
{
  "optimized_title": "...",
  "optimized_bullets": ["...", "..."],
  "optimized_description": "...",
  "optimized_keywords": "keyword1, keyword2, keyword3, keyword4"
}
`;

  try {
    const completion = await client.chat.completions.create({
      // ✅ Works for both free and paid users
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    let text = completion.choices[0].message.content.trim();
    console.log("[AI Raw Output]", text);

    // 🧹 Remove unwanted ```json or ``` wrappers if they exist
    text = text.replace(/```json/i, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(text);
    console.log("[AI Parsed Output]", parsed);

    return parsed;
  } catch (err) {
    console.error("❌ AI optimization failed:", err);
    throw new Error("AI optimization failed");
  }
}

module.exports = { optimizeListing };
