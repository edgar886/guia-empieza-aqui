"use client";

import { useRef, useState, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

// Sugerencias (23-sep-2026, Edgar): cortas, como habla la gente.
const SUGERENCIAS = [
  "Quiero ser un mejor líder.",
  "Quiero una mejor relación de pareja.",
  "Quiero ser una mejor mamá o un mejor papá.",
  "Quiero ganar más dinero.",
  "Tengo problemas con el enojo.",
  "Estoy en depresión y quiero salir.",
  "Siento que me falta algo.",
];

// Portada de cada libro, por la ruta de su página en edgarboone.com.
// Sale en la respuesta junto a "Ver el libro". Si se agrega un libro, agregar aquí su portada.
const PORTADAS: Record<string, string> = {
  "/libro-despierta": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/1e81750c-2dcf-4fa2-bcc3-cc55e5353fa2/DESPIERTA_COVER_Apple_Books+copy.jpg?format=300w",
  "/libro-self-mastery": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/8cdd36a4-8bc3-4387-a4b2-fda81fe50adf/SM_Ebook_Cover_1600x2560_FINAL+copy.jpg?format=300w",
  "/libro-en-la-arena": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/73fb00f1-1d95-442d-8a0c-909be54f86ce/EN_LA_ARENA_Ebook_Cover+copy.jpg?format=300w",
  "/libro-lidera": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/aac88240-a106-4a0e-8a6a-b3cb5cb07f61/LIDERA_COVER_APPLE.jpg?format=300w",
  "/libro-trascendencia": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/6a2389ca-7ecb-4b03-b866-5b80a2053ede/TRASCENDENCIA_Kindle_Cover.png?format=300w",
  "/libro-caban": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/652b3991-4722-4e45-af6a-e6e18be34a10/CABAN_Kindle_Cover.png?format=300w",
  "/libro-the-way": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/a64d339c-f66a-4fa4-a910-0d7050544032/THE_WAY_GRACIA_apple.png?format=300w",
  "/libros/the-way-parejas": "https://static1.squarespace.com/static/5323df9fe4b097bd81716cc3/t/6a454fe650a0e0278f0d311b/1782927334158/THE_WAY_PAREJAS_cover.png?format=300w",
  "/libros/the-way-hijos": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/61014317-944e-4380-8262-89c6052fdf38/THE_WAY_HIJOS_APPLE_BOOKS_2400x3840.jpg?format=300w",
  "/libros/the-way-padres": "https://static1.squarespace.com/static/5323df9fe4b097bd81716cc3/t/6a8e17335e4e1853317e327b/1787696948065/THE_WAY_PADRES_APPLE.jpg?format=300w",
  "/libros/the-way-emprender": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/572fdb77-abf1-4acc-ad6a-37d862674a66/THE_WAY_EMPRENDER_APPLE_1600x2560.jpg?format=300w",
  "/libros/the-way-dinero": "https://res.cloudinary.com/iizfobkt/image/upload/f_auto,q_auto,w_500/v1788345476/libros/THE_WAY_DINERO_cover.jpg",
  "/libro-despues": "https://m.media-amazon.com/images/I/41zQCfIhoqL._SL1500_.jpg",
  "/libro-legacy": "https://m.media-amazon.com/images/I/513AaprtJZL._SL1500_.jpg",
  "/libro-nada-y-todo": "https://m.media-amazon.com/images/I/51uzxqyUeOL._SL1500_.jpg",
  "/libro-salir-del-hoyo": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/e9eaf067-3404-4064-9d72-8f5103e663d7/FINAL_ebook_apple_salir_del_hoyo.jpg?format=300w",
  "/libro-volver-a-vivir": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/8b332e58-0517-44c9-a588-7e3b70510f15/VOLVER_A_VIVIR_cover.png?format=300w",
  "/libro-remembrando": "https://m.media-amazon.com/images/I/41-22KFHbAL._SL1500_.jpg",
  "/libro-semillas-del-alma": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/d80985a4-aca2-4fbc-88d9-df49ea98ee78/SEMILLAS_APPLE_2560x3840.png?format=300w",
  "/libro-the-way-of-the-world": "https://m.media-amazon.com/images/I/51zXsl-IVgL._SL1500_.jpg",
  "/libro-no-point": "https://images.squarespace-cdn.com/content/5323df9fe4b097bd81716cc3/b1491329-8e8b-44bd-b030-e4a876350b65/NO_POINT_cover.png?format=300w",
  "/libro-what-holds-you": "https://static1.squarespace.com/static/5323df9fe4b097bd81716cc3/t/6a6a799bee0be16754782862/1785362843984/WHAT_HOLDS_YOU_APPLE_1600x2560.jpg?format=300w"
};

function rutaDe(url: string): string | null {
  const m = url.match(/^https?:\/\/(?:www\.)?edgarboone\.com(\/[^\s?#)]*)/);
  return m ? m[1].replace(/\/$/, "") : null;
}

export default function Guia() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    // En iframe, avisa la altura para que la página del sitio ajuste el marco.
    if (window.parent !== window) {
      requestAnimationFrame(() =>
        window.parent.postMessage({ ebGuiaH: document.documentElement.scrollHeight }, "*")
      );
    }
  }, [messages]);

  // ?embed=1 oculta título y pie (para iframe). ?tema=azul usa la paleta azul de las páginas nuevas.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("embed") === "1") document.documentElement.classList.add("embed");
    if (q.get("tema") === "azul") document.documentElement.classList.add("azul");
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
      const msg = e instanceof Error ? e.message : "Algo falló.";
      setMessages((m) => {
        const copy = m.slice();
        copy[copy.length - 1] = { role: "assistant", content: "El guía no está disponible ahora. " + msg };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  // Los enlaces a edgarboone.com se muestran como "Ver el libro" y abren en la misma ventana del sitio.
  function render(content: string) {
    const parts = content.split(/(https?:\/\/[^\s)]+)/g);
    return parts.map((p, i) => {
      if (!/^https?:\/\//.test(p)) return <span key={i}>{p}</span>;
      const url = p.replace(/[.,;]+$/, "");
      const propio = rutaDe(url) !== null;
      return (
        <a key={i} href={url} target={propio ? "_top" : "_blank"} rel="noopener noreferrer" className="lnk">
          {propio ? "Ver el libro →" : url.replace(/^https?:\/\//, "")}
        </a>
      );
    });
  }

  // Portada del libro con el que cierra la respuesta (el arranque va al final).
  function portada(content: string) {
    const urls = content.match(/https?:\/\/[^\s)]+/g) || [];
    for (let i = urls.length - 1; i >= 0; i--) {
      const url = urls[i].replace(/[.,;]+$/, "");
      const r = rutaDe(url);
      if (r && PORTADAS[r]) {
        return (
          <a className="cover" href={url} target="_top">
            <img src={PORTADAS[r]} alt="" />
          </a>
        );
      }
    }
    return null;
  }

  return (
    <section className="guia">
      <div className="head">
        <span className="eyebrow">Guía</span>
        <h2>No sé por dónde empezar.</h2>
        <p className="lead">¿Qué buscas? ¿Qué te duele? ¿Qué quieres lograr?</p>
      </div>

      <div className="chat" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="empty">
            <p>¿Qué buscas? ¿Qué te duele? ¿Qué quieres lograr?</p>
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
            {m.role === "assistant" && <span className="who">&#9670; Guía</span>}
            <div className={m.role === "assistant" && !busy && portada(m.content) ? "withcover" : undefined}>
              {m.role === "assistant" && !busy && portada(m.content)}
              <div className="body">
                {m.content ? render(m.content) : <span className="dots">escribiendo</span>}
              </div>
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
          placeholder="Escribe aquí…"
          aria-label="Escribe aquí"
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()}>
          {busy ? "…" : "Explorar"}
        </button>
      </form>

      <p className="foot">Una guía para encontrar tu punto de entrada. Lo profundo está en los libros.</p>
    </section>
  );
}
