import { Database } from 'lucide-react';
import type { Course } from './types';

export const mongodbCourses: Course[] = [
  {
    id: 'mongodb-university',
    category: 'MongoDB',
    title: 'MongoDB University',
    desc: 'Cursos oficiales y gratuitos para modelar y consultar datos con una base flexible.',
    time: 'A tu ritmo',
    platform: 'MongoDB',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://learn.mongodb.com/',
    icon: Database,
    featured: true,
  },
  {
    id: 'mongodb-edutin',
    category: 'MongoDB',
    title: 'Curso de MongoDB',
    desc: 'Curso completo con acceso gratis; el certificado oficial tiene una tarifa ajustada por país.',
    time: 'A tu ritmo',
    platform: 'Edutin Academy',
    cost: 'Gratis + certificado pago',
    costTone: 'certificate',
    url: 'https://edutin.com/curso-de-mongodb',
    icon: Database,
  },
];