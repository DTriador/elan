export interface NewsItem {
  id: string;
  /** Etiqueta del tipo de nota: "Nuevo", "Bitácora", "Radar", etc. Vos definís las categorías que quieras. */
  tag: string;
  readTime: string; // "8 min"
  title: string;
  desc: string;
  /** Opcional: si la nota linkea a algo (un artículo, un post, una fuente externa). Si no hay link, la card se muestra sin acción de click. */
  url?: string;
}

// Orden = orden de aparición en pantalla. Sumá las notas nuevas donde quieras que aparezcan
// (ej: arriba de todo si querés mostrar siempre la más reciente primero).
export const newsItems: NewsItem[] = [
  {
    id: 'coleccionar-cursos-evidencia',
    tag: 'Nuevo',
    readTime: '8 min',
    title: 'Cómo dejar de coleccionar cursos y empezar a construir evidencia',
    desc: 'Una guía para elegir un proyecto, terminarlo y contarlo sin pedir disculpas.',
  },
  {
    id: 'repo-vale-la-pena-mostrar',
    tag: 'Bitácora',
    readTime: '5 min',
    title: 'El repo que sí vale la pena mostrar',
    desc: 'README, decisiones y una demo pequeña: las tres capas de una buena señal.',
  },
  {
    id: 'que-busca-equipo-junior',
    tag: 'Radar',
    readTime: '4 min',
    title: 'Lo que busca un equipo junior hoy',
    desc: 'Menos palabras clave. Más capacidad de explicar cómo piensas.',
  },
  // 👉 Sumá acá notas nuevas: tecnología, notas interesantes, marchas universitarias, etc.
  // id, tag, readTime, title, desc y (si aplica) url.
];