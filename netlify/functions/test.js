const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

async function call(config) {
  try {
    const r = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "اكتب 3 إعلانات قصيرة بالمصري لقميص نوم حريمي سعره 555 جنيه" }] }],
        generationConfig: config,
      }),
    });
    return { status: r.status, reply: (await r.text()).slice(0, 400) };
  } catch (e) {
    return { fetchError: String(e) };
  }
}

exports.handler = async () => {
  const withSchema = await call({
    temperature: 0.9,
    responseMimeType: "application/json",
    responseSchema: {
      type: "OBJECT",
      properties: { ads: { type: "ARRAY", items: { type: "STRING" }, minItems: 3, maxItems: 3 } },
      required: ["ads"],
    },
  });
  const plain = await call({});
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ model: MODEL, withSchema, plain }),
  };
};
