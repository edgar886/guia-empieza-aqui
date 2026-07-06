"use client";

import { useRef, useState, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGERENCIAS = [
  "Logre casi todo lo que queria y aun asi siento un vacio.",
  "Mi equipo ya no me sigue como antes y no se si son ellos o soy yo.",
  "Mi relacion se volvio rutina y no se como volver a encontrarnos.",
  "No se como criar a mis hijos sin repetir lo que a mi me hicieron.",
];

export default function Guia() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Modo embed: cuando la guia se carga dentro de un iframe con ?embed=1,
  // oculta el titulo y el pie para integrarse limpio en la pagina del sitio.
  useEffect(() => {
    const embed = new URLSearchParams(window.location.search).get("embed") === "1";
    if (embed) document.documentElement.classList.add("embed");
  }, []);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/guia", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.body) throw new Error("Sin respuesta.");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Algo fallo.";
      setMessages((m) => {
        const copy = m.slice();
        copy[copy.length - 1] = { role: "assistant", content: "El guia no esta disponible ahora. " + msg };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  // Convierte enlaces internos (edgarboone.com/...) y titulos en algo clicable de forma simple
  function render(content: string) {
    const parts = content.split(/(https?:\/\/[^\s)]+)/g);
    return parts.map((p, i) =>
      /^https?:\/\//.test(p) ? (
        <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="lnk">
          {p.replace(/^https?:\/\//, "")}
        </a>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  }

  return (
    <section className="guia">
      <div className="head">
        <span className="eyebrow">Guia</span>
        <h2>No se por donde empezar.</h2>
        <p className="lead">
          Cuentame donde estas hoy y te llevo al libro con el que te conviene empezar.
        </p>
      </div>

      <div className="chat" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="empty">
            <p>Cuentame donde estas hoy. Que buscas, que te duele, que quieres lograr.</p>
            <div className="chips">
              {SUGERENCIAS.map((s, i) => (
                <button key={i} className="chip" onClick={() => send(s)} disabled={busy}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={"msg " + m.role}>
            {m.role === "assistant" && <span className="who">&#9670; Guia</span>}
            <div className="body">
              {m.content ? render(m.content) : <span className="dots">escribiendo</span>}
            </div>
          </div>
        ))}
      </div>

      <form
        className="field"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe donde estas hoy…"
          aria-label="Escribe donde estas hoy"
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()}>
          {busy ? "…" : "Explorar"}
        </button>
      </form>

      <p className="foot">Una guia para encontrar tu punto de entrada. Lo profundo esta en los libros.</p>
    </section>
  );
}
