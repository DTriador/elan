import type { LucideIcon } from 'lucide-react';

export type CostTone = 'free' | 'certificate' | 'paid';

export interface Course {
  id: string;
  category: string;
  title: string;
  desc: string;
  time: string;
  platform: string;
  cost: string;
  costTone: CostTone;
  url: string;
  icon: LucideIcon;
  /** Marca este curso como "el mejor" de su categoría para mostrar en las Rutas por perfil.
   * Opcional: si ninguno de la categoría lo tiene, se usa el primero que aparezca (comportamiento actual). */
  featured?: boolean;
}