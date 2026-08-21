import { GraduationCap } from 'lucide-react';
import type { Course } from './types';

export const buscarTrabajoCourses: Course[] = [
  {
    id: 'job-search-01',
    category: 'Buscar Trabajo',
    title: 'Buscar trabajo con intención',
    desc: 'Aprende a leer vacantes, adaptar tu perfil y preparar conversaciones.',
    time: 'A tu ritmo',
    platform: 'Google Career Certificates',
    cost: 'Gratis + certificado pago',
    costTone: 'certificate',
    url: 'https://grow.google/certificates/interview-warmup/',
    icon: GraduationCap,
  },
];
