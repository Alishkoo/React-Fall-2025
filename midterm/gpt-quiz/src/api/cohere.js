export async function generateQuestions(theme, total = 5) {
  const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

  const prompt = `
Сгенерируй ${total} вопросов викторины по теме '${theme}'.
Каждый вопрос должен быть в формате JSON:
{
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "answer": 0
}
Верни массив из ${total} объектов JSON.
`;

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
          { role: "system", content: "Ты создаешь массив вопросов викторины в формате JSON." },
    { role: "user", content: prompt },
        ],
      }),
    });

    const data = await res.json();
    let text = data?.message?.content?.[0]?.text;

    if (!text) return [];

   
    text = text.replace(/```json/i, "").replace(/```/g, "").trim();

   
    const questionsArray = JSON.parse(text);
    console.log("Сгенерированные вопросы:", questionsArray);

    return questionsArray;

  } catch (e) {
    console.error("Ошибка запроса к Cohere:", e);
    return [];
  }
}