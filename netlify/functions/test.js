exports.handler = async () => {
  const key = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const out = { hasKey: !!key, keyLength: key ? key.length : 0, model };
  if (key) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": key },
          body: JSON.stringify({ contents: [{ parts: [{ text: "قل مرحبا" }] }] }),
        }
      );
      out.geminiStatus = r.status;
      out.geminiReply = (await r.text()).slice(0, 300);
    } catch (e) {
      out.fetchError = String(e);
    }
  }
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(out),
  };
};
