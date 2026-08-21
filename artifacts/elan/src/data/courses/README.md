# Cómo agregar cursos nuevos

1. Abrí el archivo de la categoría correspondiente (ej: `cybersecurity.ts`).
   Si la categoría no tiene archivo todavía, creá uno nuevo copiando la
   estructura de cualquiera de los existentes (mismo shape que `types.ts`).
2. Agregá el objeto del curso nuevo al array, con los mismos 9 campos:
   id, category, title, desc, time, platform, cost, costTone, url, icon.
3. `icon` es un componente de lucide-react — importalo arriba del archivo
   igual que los demás (`import { Database } from 'lucide-react'`).
4. Si creaste un archivo nuevo, importalo en `index.ts` y sumalo al array
   `courses` (el ORDEN ahí define el orden de los filtros en pantalla).
5. Nunca toques App.tsx para esto — solo estos archivos.

`category` tiene que ser EXACTAMENTE el mismo string que ya usás en los
demás cursos de esa categoría (ej: "Git/Version Control", no "Git"),
porque el filtro compara por igualdad de texto.
