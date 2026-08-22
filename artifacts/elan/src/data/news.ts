export interface NewsItem {
  id: string;
  /** Etiqueta del tipo de nota: "Oferta", "Lanzamiento", "Comunidad", etc. Vos definís las categorías que quieras. */
  tag: string;
  readTime: string; // "8 min"
  title: string;
  desc: string;
  /** Opcional: si la nota linkea a algo (un artículo, un post, una fuente externa). Si no hay link, la card se muestra sin acción de click. */
  url?: string;
}

// Orden = orden de aparición en pantalla. Sumá las notas nuevas donde quieras que aparezcan.
export const newsItems: NewsItem[] = [
  {
    id: 'gemini-oferta-estudiantes-2026',
    tag: 'Oferta',
    readTime: '3 min',
    title: 'Google regala 1 año de Gemini a estudiantes universitarios',
    desc: 'Google AI Plus gratis durante 12 meses en más de 140 países, Argentina incluida. Hay que verificar tu condición de estudiante y reclamarlo antes del 31 de diciembre de 2026.',
    url: 'https://gemini.google/students/',
  },

  {
    id: 'aws-student-rewards-2026',
    tag: 'Oferta',
    readTime: '4 min',
    title: 'AWS lanza Student Rewards: hasta USD 579 en beneficios para estudiantes',
    desc: 'Verificando tu condición de estudiante en AWS Builder Center podés acceder a 12 meses de Skill Builder Premium, hasta USD 30 en créditos AWS y un voucher de USD 100 para la certificación AWS Certified Cloud Practitioner.',
    url: 'https://builder.aws.com/student-rewards',
  },

  {
    id: 'ekoparty-trainings-2026',
    tag: 'Evento',
    readTime: '3 min',
    title: 'Ekoparty Trainings 2026: formación intensiva antes de la conferencia',
    desc: 'Antes de su 22ª edición (7 al 9 de octubre en el CEC Buenos Aires), Ekoparty ofrece trainings pagos de días previos dictados por referentes de ciberseguridad. Cupos limitados; inscribirte incluye entrada Legacy a la conferencia.',
    url: 'https://ekoparty.org/trainings/',
  },

  // 👉 Sumá acá tus próximas notas: tecnología, notas interesantes, marchas universitarias, etc.
  // id, tag, readTime, title, desc y (si aplica) url.
];