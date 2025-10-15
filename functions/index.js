// Ezt a fájlt a copilot generálta. Megírtam magamtól, nem működött. Elősször nagyon bonyolult kódot írt, aztán leegyszerűsítettem és módosítottam néhány dolgot. Működik.
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const OpenAI = require("openai");

const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

exports.generate = onRequest({ secrets: [OPENAI_API_KEY], region: "europe-west1" }, async (req, res) => {
  
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const body = req.body;
  const prompt = body.prompt;

  const client = new OpenAI({ apiKey: OPENAI_API_KEY.value() });

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const output_text = completion.choices[0].message.content;
  
  res.status(200).json({ output_text });
});