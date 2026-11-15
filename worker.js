// FlameAtlas live assistant: Cloudflare Worker using Workers AI (free daily allocation).
// Setup: create a Worker, paste this file, add a Workers AI binding named "AI", deploy.
// No API key is needed. On the Workers Free plan, requests past the daily free allocation fail instead of costing money.

const ALLOWED_ORIGINS = [
  "https://teamdivalar.github.io", // GitHub Pages site
  "http://localhost",
  "http://127.0.0.1",
  "null" // a page opened straight from disk (file://), for testing
];
const MODELS = [
  "@cf/meta/llama-3.1-8b-instruct-fp8-fast",
  "@cf/meta/llama-3.2-3b-instruct"
];
const RULES = `You are FlameAtlas, an assistant for spacecraft fire safety built for the NASA Space Apps 2026 challenge.
Answer ONLY from the evidence base below. Cite findings inline as [F1], [F2] etc. If the evidence does not cover the question, say so plainly. Never invent numbers. Answer in the language of the question, under 150 words, plain prose.`;

function allowed(origin) {
  return ALLOWED_ORIGINS.some(o => origin === o || (o.startsWith("http://") && origin.startsWith(o + ":")));
}
function cors(origin) {
  return {
    "Access-Control-Allow-Origin": allowed(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}
function reply(body, status, origin) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...cors(origin) } });
}
const str = (v, max) => (typeof v === "string" ? v.slice(0, max) : "");

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (request.method !== "POST") return reply({ error: "method" }, 405, origin);
    if (!allowed(origin)) return reply({ error: "origin" }, 403, origin);

    let data;
    try { data = await request.json(); } catch { return reply({ error: "bad_json" }, 400, origin); }
    const question = str(data.question, 600).trim();
    const evidence = str(data.evidence, 12000);
    if (!question || !evidence) return reply({ error: "missing" }, 400, origin);
    const history = (Array.isArray(data.history) ? data.history : []).slice(-4)
      .filter(m => m && (m.role === "user" || m.role === "assistant"))
      .map(m => ({ role: m.role, content: str(m.content, 1500) }));

    const messages = [
      { role: "system", content: RULES + "\nEVIDENCE BASE:\n" + evidence },
      ...history,
      { role: "user", content: question }
    ];

    for (const model of MODELS) {
      try {
        const out = await env.AI.run(model, { messages, max_tokens: 400, temperature: 0.2 });
        const text = (out && (out.response || (out.choices && out.choices[0] && out.choices[0].message && out.choices[0].message.content))) || "";
        if (text) return reply({ text, model }, 200, origin);
      } catch (err) {
        const msg = String(err && err.message || err);
        if (/neuron|limit|quota|429/i.test(msg)) return reply({ error: "limit" }, 429, origin);
      }
    }
    return reply({ error: "model" }, 502, origin);
  }
};
