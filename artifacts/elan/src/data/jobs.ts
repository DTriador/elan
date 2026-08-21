export interface JobBoard {
  id: string;
  name: string;
  description: string;
  tags: string[]; // usa los mismos filtros de la UI: 'Remote', 'Junior', 'Data', 'Dev'
  location: string;
  url: string;
}

export const jobBoards: JobBoard[] = [
  { id: 'getonboard', name: 'Get on Board', description: 'Empleos tech curados en LATAM, con filtro por seniority.', tags: ['Remote', 'Dev', 'Data', 'Junior'], location: 'LATAM · Remoto', url: 'https://www.getonbrd.com/' },
  { id: 'linkedin-jobs', name: 'LinkedIn Jobs', description: 'Red profesional global, ideal para primeras búsquedas con networking.', tags: ['Remote', 'Junior', 'Dev', 'Data'], location: 'Global', url: 'https://www.linkedin.com/jobs/' },
  { id: 'indeed', name: 'Indeed', description: 'Uno de los buscadores de empleo más grandes del mundo.', tags: ['Remote', 'Dev', 'Data'], location: 'Global', url: 'https://www.indeed.com/' },
  { id: 'glassdoor', name: 'Glassdoor', description: 'Búsquedas de empleo con reseñas y sueldos de las empresas.', tags: ['Dev', 'Data'], location: 'Global', url: 'https://www.glassdoor.com/' },
  { id: 'monster', name: 'Monster', description: 'Bolsa de empleo generalista con sección de tecnología.', tags: ['Dev', 'Data'], location: 'Global', url: 'https://www.monster.com/' },
  { id: 'ziprecruiter', name: 'ZipRecruiter', description: 'Buscador de empleo con matching automático por perfil.', tags: ['Dev', 'Data'], location: 'Global', url: 'https://www.ziprecruiter.com/' },
  { id: 'dice', name: 'Dice', description: 'Bolsa especializada en empleos de tecnología.', tags: ['Dev', 'Data'], location: 'EE.UU. · Remoto', url: 'https://www.dice.com/' },
  { id: 'simplyhired', name: 'SimplyHired', description: 'Agregador de búsquedas de empleo de múltiples fuentes.', tags: ['Dev', 'Data'], location: 'Global', url: 'https://www.simplyhired.com/' },
  { id: 'flexjobs', name: 'FlexJobs', description: 'Empleos remotos y flexibles verificados.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://www.flexjobs.com/' },
  { id: 'remote-co', name: 'Remote.co', description: 'Bolsa curada 100% de trabajos remotos.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://remote.co/' },
  { id: 'remote-com', name: 'Remote.com', description: 'Plataforma de empleo y contratación remota internacional.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://remote.com/' },
  { id: 'weworkremotely', name: 'We Work Remotely', description: 'Una de las bolsas remotas más grandes, fuerte en dev y producto.', tags: ['Remote', 'Dev'], location: 'Remoto · Global', url: 'https://weworkremotely.com/' },
  { id: 'remoteok', name: 'RemoteOK', description: 'Empleos 100% remotos en tecnología.', tags: ['Remote', 'Dev', 'Data'], location: 'Remoto · Global', url: 'https://remoteok.com/' },
  { id: 'workingnomads', name: 'Working Nomads', description: 'Curaduría diaria de trabajos remotos.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://www.workingnomads.com/jobs' },
  { id: 'hubstafftalent', name: 'Hubstaff Talent', description: 'Directorio gratuito de talento remoto y freelance.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://hubstafftalent.net/' },
  { id: 'virtualvocations', name: 'Virtual Vocations', description: 'Bolsa enfocada en trabajo remoto verificado.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://www.virtualvocations.com/' },
  { id: 'upwork', name: 'Upwork', description: 'La plataforma freelance más grande, proyectos de todo tipo.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://www.upwork.com/' },
  { id: 'freelancer', name: 'Freelancer', description: 'Marketplace de proyectos freelance internacionales.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://www.freelancer.com/' },
  { id: 'fiverr', name: 'Fiverr', description: 'Marketplace de servicios freelance por proyecto.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://www.fiverr.com/' },
  { id: 'guru', name: 'Guru', description: 'Plataforma freelance con pagos protegidos.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://www.guru.com/' },
  { id: 'peopleperhour', name: 'PeoplePerHour', description: 'Freelance por hora o por proyecto.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://www.peopleperhour.com/' },
  { id: 'toptal', name: 'Toptal', description: 'Red freelance exclusiva, proceso de selección exigente.', tags: ['Remote', 'Dev'], location: 'Remoto · Global', url: 'https://www.toptal.com/' },
  { id: 'aquent', name: 'Aquent', description: 'Agencia de staffing para roles creativos y tech.', tags: ['Dev'], location: 'Global', url: 'https://aquent.com/' },
  { id: 'remotive', name: 'Remotive', description: 'Empleos remotos curados, fuerte en tech y marketing.', tags: ['Remote', 'Dev'], location: 'Remoto · Global', url: 'https://remotive.com/' },
  { id: 'jobspresso', name: 'Jobspresso', description: 'Bolsa curada de trabajos remotos.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://jobspresso.co/' },
  { id: 'skipthedrive', name: 'SkipTheDrive', description: 'Directorio de trabajos remotos y desde casa.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://www.skipthedrive.com/' },
  { id: 'turing', name: 'Turing', description: 'Conecta developers remotos con empresas de EE.UU.', tags: ['Remote', 'Dev'], location: 'Remoto · Global', url: 'https://www.turing.com/' },
  { id: 'powertofly', name: 'PowerToFly', description: 'Empleo remoto con foco en diversidad e inclusión.', tags: ['Remote', 'Dev'], location: 'Remoto · Global', url: 'https://powertofly.com/' },
  { id: 'arc-dev', name: 'Arc.dev', description: 'Bolsa para developers remotos con proceso de matching.', tags: ['Remote', 'Dev'], location: 'Remoto · Global', url: 'https://arc.dev/' },
  { id: 'torre', name: 'Torre', description: 'Matching de talento tech, fuerte en LATAM.', tags: ['Remote', 'Dev', 'Data'], location: 'LATAM · Remoto', url: 'https://torre.ai/es' },
  { id: 'workana', name: 'Workana', description: 'La freelance más usada en LATAM, proyectos en español.', tags: ['Remote'], location: 'LATAM · Remoto', url: 'https://www.workana.com/es' },
  { id: 'latam-jobs', name: 'LATAM Jobs', description: 'Empleos remotos tech específicos para la región.', tags: ['Remote', 'Dev', 'Data'], location: 'LATAM · Remoto', url: 'https://latam.jobs/' },
  { id: 'justremote', name: 'JustRemote', description: 'Bolsa curada de trabajos 100% remotos.', tags: ['Remote'], location: 'Remoto · Global', url: 'https://justremote.co/' },
  { id: 'javascript-jobs', name: 'JavaScript Jobs', description: 'Bolsa especializada en roles remotos de JavaScript.', tags: ['Remote', 'Dev'], location: 'Remoto · Global', url: 'https://javascript.jobs/remote' },
  { id: 'remoteandtalent', name: 'Remote & Talent', description: 'Empleos remotos con foco en LATAM.', tags: ['Remote'], location: 'LATAM · Remoto', url: 'https://remoteandtalent.com/' },
  { id: 'remotetalentlatam', name: 'Remote Talent LATAM', description: 'Bolsa de trabajo remoto para talento latinoamericano.', tags: ['Remote'], location: 'LATAM · Remoto', url: 'https://remotetalentlatam.com/' },
  { id: 'weremoto', name: 'WeRemoto', description: 'Empleos remotos en español para LATAM.', tags: ['Remote'], location: 'LATAM · Remoto', url: 'https://www.weremoto.com/' },
  { id: 'soyfreelancer', name: 'SoyFreelancer', description: 'Freelance en español, proyectos para LATAM.', tags: ['Remote'], location: 'LATAM · Remoto', url: 'https://www.soyfreelancer.com/' },
  { id: 'near', name: 'Near', description: 'Conecta talento LATAM con empresas de EE.UU.', tags: ['Remote', 'Dev', 'Data'], location: 'LATAM · Remoto', url: 'https://jobs.hirewithnear.com/' },
  // 👉 Sumá acá las que confirmes de la lista ambigua (hireable/hirable, remotely.com, etc.)
  // o las empresas puntuales si decidís armar una sección separada para esas.
];