import type { CategoryId } from "./types";

export interface Category {
  id: CategoryId;
  label: string;
}

// El orden acá define el orden de los pills en el filtro.
// "Todos" no se incluye: se maneja aparte en el componente de filtros.
export const categories: Category[] = [
  { id: "sql", label: "SQL" },
  { id: "python", label: "Python" },
  { id: "powerbi", label: "Power BI" },
  { id: "data-science", label: "Data Science" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "english", label: "English for Tech" },
  { id: "frontend", label: "Frontend" },
  { id: "cloud", label: "Cloud" },
  { id: "excel", label: "Excel" },
  { id: "ai", label: "AI" },
  { id: "devops", label: "DevOps" },
  { id: "git", label: "Git/Version Control" },
  { id: "testing", label: "Testing" },
  { id: "mongodb", label: "MongoDB" },
  { id: "career", label: "Career/CV" },
  { id: "tableau", label: "Tableau" },
  { id: "python-data", label: "Python for Data" },
  { id: "java", label: "Java" },
  { id: "ml", label: "Machine Learning" },
  { id: "statistics", label: "Statistics" },
  { id: "apis", label: "APIs" },
  { id: "html-css-js", label: "HTML/CSS/JS" },
  { id: "job-search", label: "Buscar Trabajo" },
];
