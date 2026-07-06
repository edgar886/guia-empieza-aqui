import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/lib/systemPrompt";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.GUIA_MODEL || "claude-sonnet-5";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.replace(/\s/g, "");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Falta ANTHROPIC_API_KEY en el entorno." }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  let body: { messages?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Cuerpo invalido." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const messages = (body.messages || [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12); // ultimas 12 vueltas de contexto

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response(JSON.stringify({ error: "Escribe donde estas hoy." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const client = new Anthropic({ apiKey });

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 700,
      system: systemPrompt(),
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });
    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    return new Response(text || "Cuentame un poco mas de donde estas hoy.", {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch (err: unknown) {
    console.error(
      "GUIA_ERR",
      err instanceof Error ? err.stack || err.message : String(err)
    );
    const msg = err instanceof Error ? err.message : "Error del modelo.";
    return new Response("[Guia no disponible: " + msg + "]", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
}
