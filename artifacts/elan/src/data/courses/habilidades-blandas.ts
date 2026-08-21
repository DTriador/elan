import { Users } from 'lucide-react';
import type { Course } from './types';

export const habilidadesBlandasCourses: Course[] = [
  {
    id: 'softskills-capacitar-comunicacion',
    category: 'Habilidades Blandas',
    title: 'Habilidades Blandas y Comunicación',
    desc: 'Ruta del programa Capacitar del gobierno argentino sobre comunicación efectiva en el trabajo.',
    time: 'A tu ritmo',
    platform: 'Capacitar (Argentina.gob.ar)',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://www.argentina.gob.ar/sites/default/files/2025/07/capacitar_ruta_aprendizaje_programa_habilidades_blandas_y_comunicacion_v2.pdf',
    icon: Users,
    featured: true,
  },
  {
    id: 'softskills-capacitar-gestion',
    category: 'Habilidades Blandas',
    title: 'Habilidades de Gestión de Equipos y Proyectos',
    desc: 'Ruta del programa Capacitar enfocada en liderazgo, organización y gestión de proyectos.',
    time: 'A tu ritmo',
    platform: 'Capacitar (Argentina.gob.ar)',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://www.argentina.gob.ar/sites/default/files/2025/07/capacitar_ruta_aprendizaje_programa_habilidades_de_gestion_equipos_y_proyectos_v2.pdf',
    icon: Users,
  },
  {
    id: 'softskills-coursera-communication',
    category: 'Habilidades Blandas',
    title: 'Improving Communication Skills',
    desc: 'Curso de la Universidad de Pennsylvania sobre cómo comunicar ideas con más claridad e impacto.',
    time: 'A tu ritmo',
    platform: 'University of Pennsylvania (Coursera)',
    cost: 'Gratis + certificado pago',
    costTone: 'certificate',
    url: 'https://www.coursera.org/learn/wharton-communication-skills',
    icon: Users,
  },
];