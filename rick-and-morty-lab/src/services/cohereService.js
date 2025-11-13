export async function generateQuote(theme = "Rick and Morty") {
  const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

  if (!COHERE_API_KEY) {
    return "Wubba Lubba Dub-Dub! — Rick";
  }

  const prompt = `Сгенерируй короткую (до 40 слов) интересную цитату/фразу в стиле 'Рика и Морти' на тему '${theme}'.Верни только текст цитаты без дополнительных пояснений.`;

  try {
    const res = await fetch("https://api.cohere.ai/v2/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-a-03-2025",
        messages: [
          { role: "system", content: "Ты генерируешь короткие цитаты в стилистике Рика и Морти." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await res.json();
    let text = data?.message?.content?.[0]?.text || data?.message?.content?.[0]?.content || data?.text;

    if (!text) return "Wubba Lubba Dub-Dub! — Rick";

    
    text = text.replace(/```/g, "").trim();

  
    const firstLine = text.split(/\n/).map((l) => l.trim()).filter(Boolean)[0];
    return firstLine || text;
  } catch (e) {
    console.error("Cohere request failed:", e);
    return "Wubba Lubba Dub-Dub! — Rick";
  }
}

export default { generateQuote };
