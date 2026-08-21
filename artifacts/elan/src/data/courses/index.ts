import { sqlCourses } from './sql';
import { pythonCourses } from './python';
import { powerBiCourses } from './power-bi';
import { dataScienceCourses } from './data-science';
import { cybersecurityCourses } from './cybersecurity';
import { englishForTechCourses } from './english-for-tech';
import { frontendCourses } from './frontend';
import { cloudCourses } from './cloud';
import { excelCourses } from './excel';
import { aiCourses } from './ai';
import { devopsCourses } from './devops';
import { gitVersionControlCourses } from './git-version-control';
import { testingCourses } from './testing';
import { mongodbCourses } from './mongodb';
import { careerCvCourses } from './career-cv';
import { tableauCourses } from './tableau';
import { javaCourses } from './java';
import { machineLearningCourses } from './machine-learning';
import { statisticsCourses } from './statistics';
import { apisCourses } from './apis';
import { buscarTrabajoCourses } from './buscar-trabajo';
import { dataAnalystCourses } from './data-analyst';
import { backendCourses } from './backend';
import { dataEngineeringCourses } from './data-engineering';
import { sapCourses } from './sap';
import { habilidadesBlandasCourses } from './habilidades-blandas';
import type { Course } from './types';

// El ORDEN acá importa: define el orden de los pills de filtro en la UI
// (App.tsx arma el filtro con courses.map(c => c.category), deduplicado).
export const courses: Course[] = [
  ...sqlCourses,
  ...pythonCourses,
  ...powerBiCourses,
  ...dataScienceCourses,
  ...cybersecurityCourses,
  ...englishForTechCourses,
  ...frontendCourses,
  ...cloudCourses,
  ...excelCourses,
  ...aiCourses,
  ...devopsCourses,
  ...gitVersionControlCourses,
  ...testingCourses,
  ...mongodbCourses,
  ...careerCvCourses,
  ...tableauCourses,
  ...javaCourses,
  ...machineLearningCourses,
  ...statisticsCourses,
  ...apisCourses,
  ...buscarTrabajoCourses,
  ...dataAnalystCourses,
  ...habilidadesBlandasCourses,
  ...backendCourses,
  ...dataEngineeringCourses,
  ...sapCourses,
];

export type { Course, CostTone } from './types';
