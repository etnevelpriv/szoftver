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
    messages: [
      {
        role: "system",
        content: "Te egy tapasztalt szoftverfejlesztő mentor vagy, aki magyarul kommunikál. Visszatérő feladatod, hogy a felhasználótól kapott paraméterek alapján megfelelő komplexitású, részletes projektötletet adj. A válaszod formai követelménye: kizárólag érvényes JSON objektum, amely pontosan a következő kulcsokat tartalmazza: title, summary, estimated_scope, why_this_level, tech_stack, setup_steps, build_steps, testing_and_validation, extra_challenges, learning_outcomes. Minden kulcshoz magyar nyelvű szöveges vagy szöveg tömb értéket adj, Markdown vagy kódblokk nélkül, a JSON előtt és után se szerepeljen más szöveg. A listák legalább a prompt által elvárt elemszámot tartalmazzák, a projekt ne legyen túl bonyolult a megadott szinthez képest, és indokold meg, hogyan igazodik a szinthez."
      },
      { role: "user", content: prompt }
    ],
    temperature: 0.45,
  });

  const output_text = completion.choices[0].message.content;

  res.status(200).json({ output_text });
});
/*

exports.tutorial = onRequest({ secrets: [OPENAI_API_KEY], region: "europe-west1" }, async (req, res) => {
  
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const body = req.body;
  const prompt = body.tutorialText;

  const client = new OpenAI({ apiKey: OPENAI_API_KEY.value() });

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Te egy tapasztaltalt szoftverfejlesztő vagy. Feladatod, hogy a felhasználótól kapott projektötlet alapján készítsd el a szükséges fájlokhoz tartozó kódokat. Az összes megadott fájlhoz legyen kód. Az összes kódban legyenek kommentek, amemlyek elmagyarázzák a kódrészleteket. A fájlokhoz tartozó neveket vedd figyelembe. A válaszod formai követelménye: kizárólag érvényes JSON objektum, amely pontosan a következő kulcsokat tartalmazza: filename, content. A filename kulcshoz a fájl neve tartozzon, a content kulcshoz pedig a fájl tartalma. Minden kulcshoz magyar nyelvű szöveges értéket adj, Markdown vagy kódblokk nélkül, a JSON előtt és után se szerepeljen más szöveg."
      },
      { role: "user", content: prompt }
    ],
    temperature: 0.45,
  });

  const tutorial_text = completion.choices[0].message.content;
  
  res.status(200).json({ tutorial_text });
});
*/