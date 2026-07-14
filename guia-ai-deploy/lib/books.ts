// Base de conocimiento de los libros de Edgar Boone.
// El guia usa esto para recomendar UN libro-umbral segun donde este la persona.
// Los enlaces son a las paginas internas de venta en edgarboone.com.
// Fichas destiladas de los media kits oficiales de cada libro.
// Cuatro puertas siguen la metafora del piloto: despierta, domina el instrumento, crea en el mundo, trasciende.

export const SITE = "https://edgarboone.com";

export type Puerta = "Despierta" | "Dominio" | "Crea" | "Trasciende";

export interface Book {
  title: string;
  puerta: Puerta;
  umbral: boolean; // libro puerta de entrada de su terreno
  linea: string; // una linea, para el lector
  para: string; // para quien es, en que momento
  senales: string; // lo que la persona suele decir o sentir cuando este es su libro
  frase: string; // frase-ancla del libro, en la voz del libro
  href: string; // pagina interna
  proximamente?: boolean; // aun no publicado; se puede mencionar, no recomendar como arranque
}

export const BOOKS: Book[] = [
  // ---- I. DESPIERTA (empezar a verte con claridad) ----
  {
    title: "DESPIERTA",
    puerta: "Despierta",
    umbral: true,
    linea: "El primer paso: descubrir quien ha estado manejando tu vida mientras dormias.",
    para: "Para quien vive en piloto automatico y empieza a sospechar que la vida que carga no es del todo suya. El punto de entrada al camino interior. Recorre tres etapas: el despertar, el dominio y la trascendencia.",
    senales: "siento que vivo en automatico, esto no lo elegi yo, quiero cambiar y no se por donde, hay algo que no cuadra en mi vida, me perdi en el camino",
    frase: "Y si la vida que estas viviendo no es tuya. Es un espejo que te muestra donde dejaste de ser el piloto de tu propia vida.",
    href: "/libro-despierta",
  },
  {
    title: "THE WAY",
    puerta: "Despierta",
    umbral: false,
    linea: "La gracia de vivir. Libro puerta de la serie The Way.",
    para: "Para quien vive apurado aunque no haya prisa y recuerda, en el fondo, otra manera de andar. Describe la segunda manera de vivir: presente donde la vida ocurre, la mente quieta mientras trabajas, el corazon en paz mientras amas.",
    senales: "vivo corriendo todo el dia, apurado sin razon, quiero estar presente, llego a la noche vaciado, se me olvido como vivir ligero",
    frase: "Hay dos maneras de vivir. Una la conoces bien. La otra se te olvido. No es un destino, esta disponible hoy, en el siguiente respiro.",
    href: "/libros/the-way",
  },
  {
    title: "SALIR DEL HOYO",
    puerta: "Despierta",
    umbral: false,
    proximamente: false,
    linea: "Para los que llevan tiempo ahi. Como se sale del fondo.",
    para: "El libro hecho para la depresion que ya se volvio rutina. Para quien lleva tiempo abajo y ya administra el dolor en vez de sentirlo: el que ya no llora y esa quietud lo asusta mas que el llanto, el que perdio algo y sigue sosteniendo la version de estar bien. No es para quien acaba de caer por una perdida reciente, y no sustituye ayuda profesional cuando el hoyo tiene nombre de diagnostico. Acompaña, con la voz de un amigo que estuvo en el fondo.",
    senales: "sufro de depresion, estoy deprimido, llevo tiempo abajo, me siento en el fondo desde hace mucho, ya no siento nada solo administro el dolor, ya no lloro y me asusta esa quietud, lo perdi todo y sigo cargandolo, siento que me rendi por dentro, no le encuentro sentido a nada",
    frase: "No vine a decirte que todo va a estar bien. Vine a decirte como se sale. Yo no vengo del borde, vengo del fondo. El hoyo es real, y tambien es real que se sale.",
    href: "/libro-salir-del-hoyo",
  },

  {
    title: "VOLVER A VIVIR",
    puerta: "Despierta",
    umbral: false,
    proximamente: false,
    linea: "Para el que perdio algo que creia para siempre, y no sabe como volver a estar vivo.",
    para: "El libro para el despues de una perdida: una persona, un matrimonio, un negocio, una casa, el cuerpo de antes del diagnostico, un pais, una version de uno mismo. Enseña a separar las tres cosas que viven dentro de lo que llamas tu dolor: una se siente, otra se honra, y solo una se puede dejar ir, para dejar de cargar lo que ya no toca. Tambien para el que convirtio el duelo en su casa y lleva años ahi, y para el que llega buscando como acompañar a alguien mas. No sustituye ayuda profesional. Acompaña, con la voz de un amigo que ha caminado la perdida.",
    senales: "perdi a alguien, se murio alguien que amo, estoy en duelo, no supero una perdida, perdi mi matrimonio, me divorcie, cerre mi empresa, perdi mi negocio, perdi mi casa, me diagnosticaron algo, deje mi pais, extraño lo que se fue, no se como seguir sin esa persona, algo que creia para siempre se acabo, como ayudo a alguien en duelo, no se que decirle a quien perdio a alguien",
    frase: "No lloras lo que perdiste. Lloras a quien eras cuando lo tenias. Vas a seguir extrañando, eso se queda contigo. Lo que cambia es que un martes cualquiera vas a estar tomando cafe y vas a notar que esta caliente.",
    href: "/libro-volver-a-vivir",
  },

  {
    title: "NO POINT",
    puerta: "Despierta",
    umbral: false,
    proximamente: false,
    linea: "A fable for the man who arrived and found no one home. English edition.",
    para: "Para el lector en ingles que ya tiene todo lo que se suponia debia querer y despierta a las cuatro de la manana sin poder decir para que es. Una fabula corta en la tradicion de El Alquimista y El Profeta: no ofrece un proposito nuevo, ofrece algo mas raro, ver que el querer mismo era el ruido.",
    senales: "I have everything and it feels like nothing, logre todo lo que queria y sigo vacio, tengo la vida que se suponia debia querer pero algo se detuvo, I wake up at 4am with no reason, ya no se para que hago lo que hago aunque me vaya bien",
    frase: "A man who has everything wakes at four in the morning and cannot say what any of it is for.",
    href: "/libro-no-point",
  },

  // ---- II. DOMINIO (gobernar tu instrumento) ----
  {
    title: "SELF MASTERY",
    puerta: "Dominio",
    umbral: true,
    linea: "Despertaste. Y ahora que. La escuela de manejo del piloto.",
    para: "Para quien ya desperto y descubrio que tiene las manos en el volante sin saber girar. Ensena a dominar las tres dimensiones del instrumento humano: la mente, las emociones y el ego. No con afirmaciones, con practica.",
    senales: "reacciono antes de pensar, mis emociones me gobiernan, mi mente no para, quiero disciplina interior, se lo que tengo que hacer pero no me domino",
    frase: "No basta con despertar. Hay que aprender a manejar. La maestria no se lee, se entrena.",
    href: "/libro-self-mastery",
  },
  {
    title: "NADA Y TODO",
    puerta: "Dominio",
    umbral: false,
    linea: "El descenso a la raiz del miedo, y lo que aparece cuando esa raiz se disuelve.",
    para: "Para quien carga miedo, estres y ansiedad y los ha explicado de mil maneras: el trabajo, el dinero, una relacion. Va por debajo de todas esas explicaciones, hasta la creencia que vive bajo todos los miedos: puedo desaparecer.",
    senales: "tengo ansiedad, cargo estres que no cede, vivo preocupado, el miedo dirige mas de lo que admito, me angustio sin causa clara",
    frase: "El miedo no responde a un peligro real. Lo inventa. Sigue cualquier miedo hasta el fondo y no hallas un monstruo. Hallas nada. El Coco no existe. Tu, si.",
    href: "/libro-nada-y-todo",
  },
  {
    title: "CABAN",
    puerta: "Dominio",
    umbral: false,
    linea: "Lo que viene cuando la voluntad deja de funcionar.",
    para: "Para quien ya trabajo, ya se esforzo, ya hizo todo lo que sabia, y llego a un punto donde empujar mas fuerte no lo lleva mas lejos. Ensena a poner intencion desde el alma, leer las senales de la vida y soltar el control del como.",
    senales: "empujar mas fuerte ya no funciona, el control me esta estancando, quiero fluir sin rendirme, siento que forzo todo, busco un centro sereno",
    frase: "Donde el control que te trajo hasta aqui se convierte en el obstaculo que te detiene. No te ensena a controlar tu vida, te ensena a navegarla.",
    href: "/libro-caban",
  },

  // ---- III. CREA (construir en el mundo) ----
  {
    title: "EN LA ARENA",
    puerta: "Crea",
    umbral: true,
    linea: "La dignidad de los que construyen.",
    para: "Para el que crea empresas, lidera familias o levanta visiones desde la nada, y descubrio que construir es un acto solitario. La entrada al terreno de crear. Habla de los criticos, el miedo que paraliza y el ego del constructor.",
    senales: "construyo solo, me critican desde afuera, cargo el peso de sacar algo adelante, nadie ve lo que cuesta, estoy en el polvo sudando",
    frase: "Es lo que alguien debio decirte hace anos. Lo que se forja en la arena, nadie te lo puede quitar.",
    href: "/libro-en-la-arena",
  },
  {
    title: "LIDERA",
    puerta: "Crea",
    umbral: false,
    linea: "Dirigir desde la consciencia, no desde el miedo.",
    para: "Para quien tiene gente a su cargo y sospecha que la dirige desde el control o el cansancio. Nombra la soledad de quien lidera y ofrece los cinco pilares: consciencia, integridad, confianza, amor y armonia fluida.",
    senales: "mi equipo ya no me sigue, dirijo desde el control, estoy cansado de liderar, me siento solo al mando, mi organizacion opera desde el miedo",
    frase: "Las organizaciones estan enfermas porque operan desde el miedo, y el miedo no puede crear nada que perdure. Liderar es servir, y construir es amar.",
    href: "/libro-lidera",
  },
  {
    title: "THE WAY: PAREJAS",
    puerta: "Crea",
    umbral: false,
    linea: "El amor que se construye.",
    para: "Para quien ya ama a alguien y quiere dejar de defenderse del amor para empezar a construirlo. Ensena a ver a la pareja como es y no como reflejo, a pedir sin castigar, a soltar el control disfrazado de amor.",
    senales: "mi pareja y yo nos alejamos, discutimos por lo mismo, hay reclamo callado, la emocion del principio se acabo, me defiendo en vez de amar",
    frase: "El amor casi siempre estuvo. Lo que falto fue una manera de amarse sin miedo. Casi ninguna pareja se rompe por falta de amor. Se rompe por miedo.",
    href: "/libros/the-way-parejas",
  },
  {
    title: "THE WAY: HIJOS",
    puerta: "Crea",
    umbral: false,
    linea: "No te falta metodo. Te sobra miedo.",
    para: "Para el padre o la madre que hizo todo lo que se supone y aun asi la casa se siente tensa. No es un manual de crianza: trabaja el estado desde el que crias, porque un hijo no recibe tus palabras, recibe el estado desde el cual se las dijiste.",
    senales: "mi hijo se apaga o se rebela, la casa se siente tensa, puse limites y no funciona, me acuesto preguntando que falta, temo heredarle lo que me dolio",
    frase: "Un hijo no recibe tus palabras. Recibe el estado desde el cual se las dijiste. No fabricas la flor. Haces el jardin.",
    href: "/libros/the-way-hijos",
  },
  {
    title: "THE WAY: EMPRENDER",
    puerta: "Crea",
    umbral: false,
    linea: "La gracia de crear.",
    para: "Para el que carga algo que quiere crear y no salta, o ya construyo y no puede celebrar. Ensena a reconocer la voz del miedo disfrazada de sensatez, a separarse de la creacion sin dejar de amarla, y a crear desde lo lleno.",
    senales: "tengo una idea y no salto, todavia no es el momento, me preparo eternamente, ya construi y no lo disfruto, estoy confundido con mis resultados",
    frase: "Tu empresa no te obedece. Te retrata. Casi ningun proyecto muere por falta de plan. Muere por miedo vestido de prudencia.",
    href: "/libros/the-way-emprender",
  },

  // ---- IV. TRASCIENDE (volver a la raiz) ----
  {
    title: "TRASCENDENCIA",
    puerta: "Trasciende",
    umbral: true,
    linea: "El viaje de vuelta a lo que siempre fuiste.",
    para: "Para quien lo logro todo y siente que algo falta: no algo que se compra, algo que se siente a las tres de la manana en un silencio antiguo. La entrada al terreno de trascender. La experiencia directa de la fuente, no como idea sino como realidad vivida.",
    senales: "lo tengo todo y siento un vacio, hay algo mas y quiero buscarlo, despierto a las 3am con un silencio dentro, busco lo espiritual sin religion",
    frase: "El viaje fue el proceso de recordar, no de llegar. Despierta. Y no vuelvas a dormir.",
    href: "/libro-trascendencia",
  },
  {
    title: "LEGACY",
    puerta: "Trasciende",
    umbral: false,
    linea: "El legado que el dinero no puede comprar.",
    para: "Para el patriarca o constructor que mira a su familia con la casa hermosa y la empresa funcionando, y algo le pesa. Sobre los patrones invisibles que la familia repite, y la diferencia entre herencia (se gasta) y legado (permanece).",
    senales: "mi familia se ve perfecta pero algo duele, mis hijos lo tienen todo y me preocupan, que dejo cuando ya no este, el dinero resolvio lo visible y rompio lo invisible",
    frase: "Tus hijos heredan lo que eres, no solo lo que tienes. Tu legado mas poderoso no es lo que dejas. Es lo que eres.",
    href: "/libro-legacy",
  },
  {
    title: "DESPUES",
    puerta: "Trasciende",
    umbral: false,
    linea: "Viviendo desde la plenitud. Ya hiciste todo eso, y ahora que.",
    para: "Para el fundador o ejecutivo que vendio, se retiro, o sigue yendo a la oficina sin sentir nada. Donde todo funciona y nada vibra. Sobre los territorios que abandono al construir y la posibilidad de crear de nuevo, desde suficiente.",
    senales: "ya lo logre y no siento nada, vendi la empresa y ahora que, me retire y perdi el sentido, todo funciona y nada vibra, el exito dejo de llenarme",
    frase: "Lograste lo que te propusiste. Se suponia que iba a ser suficiente. No lo fue. Lo que viene se construye desde otro lugar.",
    href: "/libro-despues",
  },
  {
    title: "REMEMBRANDO",
    puerta: "Trasciende",
    umbral: false,
    linea: "Escritos para el camino de recordar. Poesia en prosa.",
    para: "Para el que busca claridad en momentos de ruido, o quiere recordar lo que sabe pero ha olvidado. Una coleccion de escritos nacidos como respuestas vivas a momentos de crisis, perdida y decision. Un companero diario, casi un oraculo de consciencia.",
    senales: "quiero algo para leer despacio, busco palabras que me acompanen, estoy en un momento de perdida o decision, necesito recordarme quien soy",
    frase: "Herramientas de recordacion: textos que te devuelven a quien eres, en los momentos en que lo olvidas.",
    href: "/libro-remembrando",
  },
  {
    title: "SEMILLAS DEL ALMA",
    puerta: "Trasciende",
    umbral: false,
    linea: "Mas de cien frases, aforismos y declaraciones. Una por pagina.",
    para: "Para quien quiere verdades destiladas, sin explicaciones ni teoria, para abrir en cualquier pagina y quedarse con una. Libro transversal: cruza todos los territorios y sirve tanto de puerta de entrada como de companero permanente.",
    senales: "quiero algo breve y potente, para la mesa de noche, para abrir al azar, un destilado de todo, algo para regalar",
    frase: "Solo verdades escritas con la menor cantidad de palabras posible. La meta eres tu.",
    href: "/libro-semillas-del-alma",
  },
  {
    title: "THE WAY OF THE WORLD",
    puerta: "Trasciende",
    umbral: false,
    linea: "Why the World Is Waking, Not Falling Apart. English edition.",
    para: "Para el lector en ingles con temor por el momento del mundo. Propone una sola lente: mirar a la humanidad como un solo ser, joven, despertando por primera vez, que confunde el amanecer con un incendio. No da tareas ni predicciones, solo una manera de ver.",
    senales: "I read in English, the world feels like its collapsing, I feel dread about where humanity is going, I want hope that is lucid not naive",
    frase: "What we keep calling collapse may be the sound a thing makes when it opens its eyes. The world isnt ending. Its young, and frightened, and beginning to wake.",
    href: "/libro-the-way-of-the-world",
  },
];

export function booksForPrompt(): string {
  return BOOKS.map((b) => {
    const u = b.umbral ? " [UMBRAL de " + b.puerta + "]" : "";
    const prox = b.proximamente ? " [PROXIMAMENTE, aun no publicado]" : "";
    return [
      `- ${b.title}${u}${prox} (${b.puerta})`,
      `  Que es: ${b.linea}`,
      `  Para quien: ${b.para}`,
      `  Senales de que es su libro: ${b.senales}`,
      `  Voz del libro: ${b.frase}`,
      `  Enlace: ${SITE}${b.href}`,
    ].join("\n");
  }).join("\n\n");
}
