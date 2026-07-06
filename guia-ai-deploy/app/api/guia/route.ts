import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/lib/systemPrompt";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.GUIA_MODEL || "claude-sonnet-5";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
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

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const s = await client.messages.stream({
          model: MODEL,
          max_tokens: 700,
          system: systemPrompt(),
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });
        for await (const event of s) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error del modelo.";
        controller.enqueue(encoder.encode("\n[Guia no disponible: " + msg + "]"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
