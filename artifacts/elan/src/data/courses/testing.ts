import { CheckCircle2 } from 'lucide-react';
import type { Course } from './types';

export const testingCourses: Course[] = [
  {
    id: 'testing-freecodecamp',
    category: 'Testing',
    title: 'Testing para construir con confianza',
    desc: 'Convierte la calidad en una práctica concreta desde tu próximo proyecto.',
    time: 'A tu ritmo',
    platform: 'freeCodeCamp',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://www.freecodecamp.org/learn/quality-assurance/',
    icon: CheckCircle2,
    featured: true,
  },
  {
    id: 'testing-automation-university',
    category: 'Testing',
    title: 'Test Automation University',
    desc: 'Más de 50 cursos gratuitos sobre automatización de testing, dictados por referentes de la industria.',
    time: 'A tu ritmo',
    platform: 'Applitools',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://testautomationu.applitools.com/',
    icon: CheckCircle2,
  },
];