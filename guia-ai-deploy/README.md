# Guía AI de Edgar Boone (Fase 2)

El buscador que refleja antes de recomendar. La persona escribe dónde está hoy, el guía le devuelve una distinción con la voz de Edgar y le sugiere un libro-umbral. Es la muestra viva de la mentoría: los libros son la punta, el trabajo real es con Edgar.

Esto es una app Next.js independiente, lista para desplegar. No toca Squarespace hasta que la embebas con un iframe.

## Qué hace

- Chat de una sola columna, on-brand (crema, navy, oro, Cormorant + Inter).
- Refleja en dos o tres frases y recomienda **un** libro, casi siempre el umbral del terreno (Despertar, Construir, Trascender).
- Respeta las reglas de voz: sin em-dashes, sin "no X sino Y", "coraje" nunca es valentía, sin relleno IA.
- Respuesta en streaming (se escribe en vivo).

## Estructura

```
app/
  api/guia/route.ts   -> endpoint que llama al modelo (server, seguro)
  page.tsx            -> monta el guía
  layout.tsx, globals.css
components/Guia.tsx    -> UI del chat
lib/
  books.ts            -> los 16 libros, terreno, umbral, enlaces internos
  systemPrompt.ts     -> quién es el guía y cómo suena
embed-squarespace.html -> snippet iframe para pegar en /empieza-aqui
```

Para editar el copy o el catálogo, toca `lib/books.ts` y `lib/systemPrompt.ts`. Nada más.

## Correr en local

```bash
cd guia-ai-nextjs
npm install
cp .env.example .env.local     # y pon tu ANTHROPIC_API_KEY real
npm run dev                    # http://localhost:3000
```

## Desplegar (Vercel, recomendado)

1. Sube esta carpeta a un repo de GitHub (o usa `vercel` CLI).
2. En Vercel: New Project -> importa el repo.
3. En Settings -> Environment Variables agrega:
   - `ANTHROPIC_API_KEY` = tu llave (empieza con `sk-ant-`).
   - `GUIA_MODEL` = `claude-sonnet-5` (opcional; `claude-haiku-4-5-20251001` es más rápido y barato).
4. Deploy. Vercel te da una URL, por ejemplo `https://empieza-aqui-guia.vercel.app`.
5. (Opcional) Apunta un subdominio propio, por ejemplo `guia.edgarboone.com`, a ese deploy.

La llave vive solo en el servidor. Nunca se expone al navegador.

## Conectarlo a la web (Squarespace)

1. Abre `embed-squarespace.html`.
2. Reemplaza `TU-DOMINIO-VERCEL` por tu URL de deploy.
3. En Squarespace, en la página **/empieza-aqui**, agrega un **Code block nuevo justo debajo** del bloque de las tres puertas y pega ese snippet.

Así queda: primero las tres puertas curadas, y debajo el guía AI, tal como el mockup.

## Notas de modelo

`app/api/guia/route.ts` usa `@anthropic-ai/sdk`. El string exacto del modelo se controla con `GUIA_MODEL`. Si un nombre de modelo cambia, actualízalo ahí o en la variable de entorno.

## Costo y límites

Cada intercambio es una llamada corta (max 700 tokens de salida). Con Haiku el costo por consulta es mínimo. Si quieres poner un límite de uso, agrega rate limiting en el endpoint (por IP) antes de abrirlo al público.
