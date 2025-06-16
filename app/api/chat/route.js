export const runtime = 'edge';

export async function POST(req) {
  const { messages } = await req.json();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://mkcodexnew.vercel.app/", // ✅ your deployed domain (adjust if needed)
      "X-Title": "MK Codex Chat"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: messages,
      temperature: 0.7
    })
  });

  const data = await response.json();

  console.log("🔍 OpenRouter Raw Response:", JSON.stringify(data));

  if (!data.choices || !data.choices[0]) {
    return new Response(JSON.stringify({ output: "No response from model." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ output: data.choices[0].message.content }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
