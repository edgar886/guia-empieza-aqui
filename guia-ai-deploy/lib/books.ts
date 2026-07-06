// Base de conocimiento de los libros de Edgar Boone.
// El guía usa esto para recomendar UN libro-umbral segun donde este la persona.
// Los enlaces son a las paginas internas de venta en edgarboone.com.

export const SITE = "https://edgarboone.com";

export type Puerta = "Despertar" | "Construir" | "Trascender";

export interface Book {
  title: string;
  puerta: Puerta;
  umbral: boolean; // libro puerta de entrada de su terreno
  linea: string; // una linea, para el lector
  para: string; // para quien es, en que momento
  href: string; // pagina interna
}

export const BOOKS: Book[] = [
  // ---- DESPERTAR ----
  {
    title: "DESPIERTA",
    puerta: "Despertar",
    umbral: true,
    linea: "El primer paso: empezar a verte con claridad.",
    para: "Para quien siente que algo por dentro pide cambiar y todavia no sabe nombrarlo. El punto de entrada al camino interior.",
    href: "/libro-despierta",
  },
  {
    title: "SELF MASTERY",
    puerta: "Despertar",
    umbral: false,
    linea: "El dominio de uno mismo.",
    para: "Para quien ya desperto y quiere gobernar su mente, sus impulsos y su atencion en lugar de ser gobernado por ellos.",
    href: "/libro-self-mastery",
  },
  {
    title: "CABAN",
    puerta: "Despertar",
    umbral: false,
    linea: "Navegar la vida desde la fuente.",
    para: "Para quien busca vivir desde un centro sereno, con la vida moviendose a traves de el en vez de contra el.",
    href: "/libro-caban",
  },
  {
    title: "NADA Y TODO",
    puerta: "Despertar",
    umbral: false,
    linea: "La anatomia del miedo y el camino a la libertad.",
    para: "Para quien reconoce que el miedo dirige mas de lo que admite y quiere entenderlo de raiz para soltarlo.",
    href: "/libro-nada-y-todo",
  },

  // ---- CONSTRUIR ----
  {
    title: "EN LA ARENA",
    puerta: "Construir",
    umbral: true,
    linea: "La dignidad de los que construyen.",
    para: "Para quien lidera, emprende o carga con el peso de sacar algo adelante y quiere hacerlo sin perderse. La entrada al terreno de construir.",
    href: "/libro-en-la-arena",
  },
  {
    title: "LIDERA",
    puerta: "Construir",
    umbral: false,
    linea: "Dirigir desde la consciencia, no desde el miedo.",
    para: "Para quien tiene gente a su cargo y sospecha que la esta dirigiendo desde el control o el cansancio en vez de la presencia.",
    href: "/libro-lidera",
  },
  {
    title: "THE WAY",
    puerta: "Construir",
    umbral: false,
    linea: "La gracia de vivir.",
    para: "Para quien quiere llevar la consciencia a la vida diaria: el trabajo, el amor, los hijos. La base de la serie The Way.",
    href: "/libros/the-way",
  },
  {
    title: "THE WAY: PAREJAS",
    puerta: "Construir",
    umbral: false,
    linea: "El amor que se construye.",
    para: "Para quien quiere una relacion que crezca en vez de gastarse, y esta dispuesto a mirar lo que trae al vinculo.",
    href: "/libros/the-way-parejas",
  },
  {
    title: "THE WAY: HIJOS",
    puerta: "Construir",
    umbral: false,
    linea: "La gracia de formar.",
    para: "Para el padre o la madre que quiere criar desde la presencia y no desde el miedo, sin domesticar a sus hijos.",
    href: "/libros/the-way-hijos",
  },
  {
    title: "THE WAY: EMPRENDER",
    puerta: "Construir",
    umbral: false,
    linea: "La gracia de crear.",
    para: "Para quien construye una empresa o un proyecto y quiere emprender desde la vocacion, no desde la prisa o la prudencia disfrazada de control.",
    href: "/libros/the-way-emprender",
  },
  {
    title: "LEGACY",
    puerta: "Construir",
    umbral: false,
    linea: "El legado que el dinero no puede comprar.",
    para: "Para quien ya construyo y ahora se pregunta que queda cuando el ya no este: familia, patrimonio, sentido.",
    href: "/libro-legacy",
  },

  // ---- TRASCENDER ----
  {
    title: "TRASCENDENCIA",
    puerta: "Trascender",
    umbral: true,
    linea: "El viaje de vuelta a lo que siempre fuiste.",
    para: "Para quien busca la raiz, lo que queda cuando lo demas se cae. La entrada al terreno de trascender.",
    href: "/libro-trascendencia",
  },
  {
    title: "DESPUES",
    puerta: "Trascender",
    umbral: false,
    linea: "Viviendo desde la plenitud.",
    para: "Para quien ya solto y quiere vivir desde lo que sobra, no desde lo que falta.",
    href: "/libro-despues",
  },
  {
    title: "REMEMBRANDO",
    puerta: "Trascender",
    umbral: false,
    linea: "Escritos para el camino de recordar.",
    para: "Para quien lee despacio y quiere una voz contemplativa que lo acompane en el regreso a si mismo.",
    href: "/libro-remembrando",
  },
  {
    title: "SEMILLAS DEL ALMA",
    puerta: "Trascender",
    umbral: false,
    linea: "Frases, aforismos y declaraciones.",
    para: "Para quien quiere verdades destiladas, para abrir en cualquier pagina y quedarse con una.",
    href: "/libro-semillas-del-alma",
  },
  {
    title: "THE WAY OF THE WORLD",
    puerta: "Trascender",
    umbral: false,
    linea: "Why the World Is Waking, Not Falling Apart (edicion en ingles).",
    para: "Para el lector en ingles que quiere una mirada de fondo sobre el momento del mundo, con esperanza lucida.",
    href: "/libro-the-way-of-the-world",
  },
];

export function booksForPrompt(): string {
  return BOOKS.map((b) => {
    const u = b.umbral ? " [UMBRAL de " + b.puerta + "]" : "";
    return `- ${b.title}${u} (${b.puerta}) — ${b.linea} ${b.para} Enlace: ${SITE}${b.href}`;
  }).join("\n");
}
