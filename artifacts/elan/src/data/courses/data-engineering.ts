import { Database } from 'lucide-react';
import type { Course } from './types';

export const dataEngineeringCourses: Course[] = [
  {
    id: 'dataeng-zoomcamp',
    category: 'Ingeniería de Datos',
    title: 'Data Engineering Zoomcamp',
    desc: 'Curso comunitario y gratuito: pipelines, orquestación, warehousing y streaming con proyectos reales.',
    time: 'Varias semanas',
    platform: 'DataTalksClub',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp',
    icon: Database,
    featured: true,
  },
  {
    id: 'dataeng-coursera-ibm',
    category: 'Ingeniería de Datos',
    title: 'IBM Data Engineering',
    desc: 'Certificado profesional completo: Python, SQL, ETL, Spark y bases de datos para producción.',
    time: 'A tu ritmo',
    platform: 'IBM (Coursera)',
    cost: 'Gratis + certificado pago',
    costTone: 'certificate',
    url: 'https://www.coursera.org/professional-certificates/ibm-data-engineering',
    icon: Database,
  },
  {
    id: 'dataeng-google-skills',
    category: 'Ingeniería de Datos',
    title: 'Ruta de Ingeniería de Datos',
    desc: 'Ruta oficial de Google con labs prácticos. El plan gratuito da créditos mensuales limitados.',
    time: 'A tu ritmo',
    platform: 'Google Skills',
    cost: 'Gratis + suscripción paga',
    costTone: 'certificate',
    url: 'https://www.skills.google/paths/16',
    icon: Database,
  },
];