import { Server } from 'lucide-react';
import type { Course } from './types';

export const apisCourses: Course[] = [
  {
    id: 'apis-01',
    category: 'APIs',
    title: 'APIs y servicios web',
    desc: 'Entiende endpoints, HTTP y cómo conectar productos entre sí.',
    time: 'A tu ritmo',
    platform: 'Postman Academy',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://academy.postman.com/',
    icon: Server,
  },
];
