import { GitBranch } from 'lucide-react';
import type { Course } from './types';

export const gitVersionControlCourses: Course[] = [
  {
    id: 'git-freecodecamp',
    category: 'Git/Version Control',
    title: 'Introduction to Git and GitHub',
    desc: 'Lo esencial para versionar tu código y colaborar en proyectos, con certificado de freeCodeCamp.',
    time: 'A tu ritmo',
    platform: 'freeCodeCamp',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://www.freecodecamp.org/learn/introduction-to-git-and-github/',
    icon: GitBranch,
    featured: true,
  },
  {
    id: 'git-github-skills',
    category: 'Git/Version Control',
    title: 'Git sin miedo',
    desc: 'Un flujo de trabajo claro para trabajar en equipo y mostrar tu proceso.',
    time: 'A tu ritmo',
    platform: 'GitHub Skills',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://skills.github.com/',
    icon: GitBranch,
  },
  {
    id: 'git-simplilearn',
    category: 'Git/Version Control',
    title: 'Git Basics',
    desc: 'Curso gratuito con certificado sobre los comandos y el flujo básico de Git.',
    time: 'A tu ritmo',
    platform: 'Simplilearn',
    cost: 'Gratis',
    costTone: 'free',
    url: 'https://www.simplilearn.com/learn-git-basics-skillup',
    icon: GitBranch,
  },
];