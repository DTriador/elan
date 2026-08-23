import { type FormEvent, type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import CoursesPage from '@/pages/courses';
import ToolsPage from '@/pages/tools';
import JobsPage from '@/pages/jobs';
import NewsPage from '@/pages/news';
import { newsItems } from '@/data/news';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  MapPin,
  Menu,
  Network,
  Send,
  Server,
  Search,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { courses } from '@/data/courses';
import { toolboxItems } from '@/data/toolbox';
import { jobBoards } from '@/data/jobs';

type QuizProfile =
  | 'Data'
  | 'Software Dev'
  | 'Cybersecurity / Cloud'
  | 'UI / Frontend'
  | 'Career Readiness';

type QuizOption = {
  label: string;
  scores: Partial<Record<QuizProfile, number>>;
};

type QuizQuestion = {
  question: string;
  options: QuizOption[];
};

type LearningPath = {
  id: string;
  number: string;
  title: string;
  description: string;
  steps: { label: string; category: string }[];
};

const profileTopics: Record<QuizProfile, string[]> = {
  Data: ['SQL', 'Power BI', 'Data Science', 'Excel', 'AI'],
  'Software Dev': ['Python', 'Frontend', 'Git/Version Control', 'Testing', 'MongoDB'],
  'Cybersecurity / Cloud': ['Cybersecurity', 'Cloud', 'DevOps', 'Git/Version Control'],
  'UI / Frontend': ['Frontend', 'AI', 'Git/Version Control', 'Testing'],
  'Career Readiness': ['English for Tech', 'Career/CV', 'Git/Version Control', 'Python'],
};

const quizQuestions: QuizQuestion[] = [
  {
    question: '¿Qué te gustaría poder mostrar en tu próximo proyecto?',
    options: [
      { label: 'Un dashboard que convierta datos en decisiones', scores: { Data: 1 } },
      { label: 'Una API que resuelva un problema real', scores: { 'Software Dev': 1 } },
      { label: 'Un sistema protegido y listo para escalar', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'Una interfaz clara, rápida y fácil de usar', scores: { 'UI / Frontend': 1 } },
      { label: 'Un perfil profesional sólido, listo para postularme', scores: { 'Career Readiness': 1 } },
    ],
  },
  {
    question: '¿Qué tipo de problema te genera más curiosidad?',
    options: [
      { label: 'Encontrar un patrón escondido en un montón de números', scores: { Data: 1 } },
      { label: 'Diseñar la lógica que conecta todo por detrás', scores: { 'Software Dev': 1 } },
      { label: 'Encontrar la grieta antes de que alguien la explote', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'Lograr que algo se sienta intuitivo al usarlo', scores: { 'UI / Frontend': 1 } },
      { label: 'Entender qué buscan realmente los equipos que contratan', scores: { 'Career Readiness': 1 } },
    ],
  },
  {
    question: 'Cuando algo se rompe, tu primer impulso es...',
    options: [
      { label: 'Revisar si el dato de origen está mal, antes que el código', scores: { Data: 1 } },
      { label: 'Aislar el error paso a paso hasta encontrar la causa', scores: { 'Software Dev': 1 } },
      { label: 'Pensar en quién pudo haber entrado y por dónde', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'Ver si el problema se nota en la experiencia del usuario', scores: { 'UI / Frontend': 1 } },
      { label: 'Documentarlo para poder explicarlo después con claridad', scores: { 'Career Readiness': 1 } },
    ],
  },
  {
    question: 'Un fin de semana libre, ¿qué proyecto personal elegirías?',
    options: [
      { label: 'Armar un dashboard con estadísticas de algo que me interese', scores: { Data: 1 } },
      { label: 'Programar una automatización que me ahorre tiempo', scores: { 'Software Dev': 1 } },
      { label: 'Configurar un servidor propio y asegurarlo bien', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'Rediseñar la interfaz de una app que uso seguido', scores: { 'UI / Frontend': 1 } },
      { label: 'Actualizar mi CV y mi perfil de LinkedIn', scores: { 'Career Readiness': 1 } },
    ],
  },
  {
    question: '¿Qué herramienta te genera más ganas de aprender?',
    options: [
      { label: 'Power BI o SQL', scores: { Data: 1 } },
      { label: 'Un framework de backend (Node, Django, etc.)', scores: { 'Software Dev': 1 } },
      { label: 'Un firewall o una herramienta de pentesting', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'React o alguna librería de diseño', scores: { 'UI / Frontend': 1 } },
      { label: 'Una plataforma para practicar entrevistas técnicas', scores: { 'Career Readiness': 1 } },
    ],
  },
  {
    question: 'En un equipo de trabajo, ¿qué rol tomás naturalmente?',
    options: [
      { label: 'El que traduce números en conclusiones para el resto', scores: { Data: 1 } },
      { label: 'El que arma la estructura para que todo funcione', scores: { 'Software Dev': 1 } },
      { label: 'El que pregunta "¿esto es seguro?" antes que nadie', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'El que se fija en cómo se ve y se siente el resultado', scores: { 'UI / Frontend': 1 } },
      { label: 'El que organiza cómo comunicar lo que el equipo logró', scores: { 'Career Readiness': 1 } },
    ],
  },
  {
    question: '¿Qué te daría más satisfacción al terminar un proyecto?',
    options: [
      { label: 'Que alguien tome una mejor decisión gracias a tu análisis', scores: { Data: 1 } },
      { label: 'Que el sistema funcione sin romperse bajo presión', scores: { 'Software Dev': 1 } },
      { label: 'Que nadie haya podido vulnerarlo', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'Que alguien lo use sin necesitar instrucciones', scores: { 'UI / Frontend': 1 } },
      { label: 'Que ese proyecto te abra la puerta a una entrevista', scores: { 'Career Readiness': 1 } },
    ],
  },
  {
    question: '¿Qué lectura te resulta más entretenida?',
    options: [
      { label: 'Un informe con gráficos y estadísticas', scores: { Data: 1 } },
      { label: 'Documentación técnica de una librería nueva', scores: { 'Software Dev': 1 } },
      { label: 'Un caso real de una brecha de seguridad', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'Un artículo sobre tendencias de diseño', scores: { 'UI / Frontend': 1 } },
      { label: 'Historias de gente que consiguió su primer trabajo tech', scores: { 'Career Readiness': 1 } },
    ],
  },
  {
    question: 'Si tuvieras que elegir una materia favorita de la facultad, sería...',
    options: [
      { label: 'Estadística o Bases de Datos', scores: { Data: 1 } },
      { label: 'Estructuras de Datos o Algoritmos', scores: { 'Software Dev': 1 } },
      { label: 'Redes o Sistemas Operativos', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'Interacción Humano-Computadora', scores: { 'UI / Frontend': 1 } },
      { label: 'Alguna optativa de comunicación o gestión', scores: { 'Career Readiness': 1 } },
    ],
  },
  {
    question: '¿Qué te acercaría más a tu primer trabajo en tecnología?',
    options: [
      { label: 'Un proyecto de análisis con datos reales', scores: { Data: 1 } },
      { label: 'Un repo con una API bien armada', scores: { 'Software Dev': 1 } },
      { label: 'Una certificación o CTF resuelto', scores: { 'Cybersecurity / Cloud': 1 } },
      { label: 'Un portfolio visual prolijo', scores: { 'UI / Frontend': 1 } },
      { label: 'Un CV y LinkedIn bien trabajados', scores: { 'Career Readiness': 1 } },
    ],
  },
];

const learningPaths: LearningPath[] = [
  {
    id: 'data-analyst',
    number: '01',
    title: 'Analista de Datos',
    description: 'SQL, Power BI, Excel, Tableau y Python para Data.',
    steps: [
      { label: 'SQL', category: 'SQL' },
      { label: 'Power BI', category: 'Power BI' },
      { label: 'Excel', category: 'Excel' },
      { label: 'Tableau', category: 'Tableau' },
      { label: 'Python para Data', category: 'Python for Data' },
    ],
  },
  {
    id: 'data-scientist',
    number: '02',
    title: 'Científico de Datos',
    description: 'Python, Data Science, IA, Machine Learning, SQL y Statistics.',
    steps: [
      { label: 'Python', category: 'Python' },
      { label: 'Data Science', category: 'Data Science' },
      { label: 'IA / AI', category: 'AI' },
      { label: 'Machine Learning', category: 'Machine Learning' },
      { label: 'SQL', category: 'SQL' },
      { label: 'Statistics', category: 'Statistics' },
    ],
  },
  {
    id: 'backend',
    number: '03',
    title: 'Desarrollador Backend',
    description: 'Python, Java, bases de datos, APIs, MongoDB y Git.',
    steps: [
      { label: 'Python', category: 'Python' },
      { label: 'Java', category: 'Java' },
      { label: 'MongoDB', category: 'MongoDB' },
      { label: 'Git / Version Control', category: 'Git/Version Control' },
      { label: 'APIs', category: 'APIs' },
    ],
  },
  {
    id: 'frontend',
    number: '04',
    title: 'Desarrollador Frontend',
    description: 'Frontend, HTML/CSS/JS y Git para crear experiencias web.',
    steps: [
      { label: 'Frontend', category: 'Frontend' },
      { label: 'HTML/CSS/JS', category: 'Frontend' },
      { label: 'Git / Version Control', category: 'Git/Version Control' },
    ],
  },
  {
    id: 'security-cloud',
    number: '05',
    title: 'Ciberseguridad & Cloud',
    description: 'Ciberseguridad, Cloud y DevOps para sistemas confiables.',
    steps: [
      { label: 'Ciberseguridad', category: 'Cybersecurity' },
      { label: 'Cloud', category: 'Cloud' },
      { label: 'DevOps', category: 'DevOps' },
    ],
  },
  {
    id: 'career',
    number: '06',
    title: 'Preparación Laboral & Habilidades',
    description: 'Inglés para Tech, búsqueda laboral y CV con evidencia.',
    steps: [
      { label: 'English for Tech', category: 'English for Tech' },
      { label: 'Buscar Trabajo', category: 'Buscar Trabajo' },
      { label: 'Career / CV', category: 'Career/CV' },
    ],
  },
];

const queryClient = new QueryClient();

function Home() {
  const [, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navDropdown, setNavDropdown] = useState<'rutas' | 'cursos' | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizProfile | null>(null);
  const [recommendedCategories, setRecommendedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [supportSent, setSupportSent] = useState(false);
  const [supportSubmitting, setSupportSubmitting] = useState(false);
  const [supportError, setSupportError] = useState('');
  const [supportForm, setSupportForm] = useState({ name: '', email: '', subject: '', message: '' });

  const courseCategories = useMemo(() => {
    const seen: string[] = [];
    courses.forEach((course) => {
      if (!seen.includes(course.category)) seen.push(course.category);
    });
    return seen;
  }, []);

  // Home muestra: resultados de búsqueda (todos) > recomendados del quiz (todos) > 3 destacados
  const homeCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      return courses.filter((course) =>
        [course.category, course.title, course.desc, course.platform].some((field) =>
          field.toLowerCase().includes(query)
        )
      );
    }
    if (recommendedCategories.length) {
      return courses.filter((course) => recommendedCategories.includes(course.category));
    }
    const featured = courses.filter((course) => course.featured);
    if (featured.length >= 3) return featured.slice(0, 3);
    const rest = courses.filter((course) => !course.featured);
    return [...featured, ...rest].slice(0, 3);
  }, [recommendedCategories, searchQuery]);

  const isHomeCoursesLimited = !searchQuery.trim() && recommendedCategories.length === 0;

  const homeToolboxItems = useMemo(() => toolboxItems.slice(0, 3), []);
  const homeJobs = useMemo(() => jobBoards.slice(0, 3), []);
  const homeNewsItems = useMemo(() => newsItems.slice(0, 3), []);

  const chooseAnswer = (index: number) => {
    const next = [...quizAnswers];
    next[quizStep] = index;
    setQuizAnswers(next);
  };

  const submitQuiz = () => {
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
      return;
    }
    const scores = Object.fromEntries(Object.keys(profileTopics).map((profile) => [profile, 0])) as Record<QuizProfile, number>;
    quizAnswers.forEach((answer, questionIndex) => {
      const option = quizQuestions[questionIndex]?.options[answer];
      if (!option) return;
      Object.entries(option.scores).forEach(([profile, points]) => {
        scores[profile as QuizProfile] += points ?? 0;
      });
    });
    const maxScore = Math.max(...Object.values(scores));
    const topProfiles = (Object.keys(scores) as QuizProfile[]).filter((profile) => scores[profile] === maxScore);
    const recommendedProfile = topProfiles[Math.floor(Math.random() * topProfiles.length)];
    setQuizResult(recommendedProfile);
  };

  const applyRecommendation = (profile: QuizProfile) => {
    setRecommendedCategories(profileTopics[profile]);
    scrollTo('courses');
  };

  const resetCourseRecommendation = () => {
    setRecommendedCategories([]);
  };

  const submitSupport = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSupportSubmitting(true);
    setSupportSent(false);
    setSupportError('');
    try {
      const response = await fetch('https://formspree.io/f/xwleqpze', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(supportForm),
      });
      if (!response.ok) throw new Error('Formspree request failed');
      setSupportForm({ name: '', email: '', subject: '', message: '' });
      setSupportSent(true);
    } catch {
      setSupportError('No pudimos enviar la nota. Revisa tu conexión e inténtalo nuevamente.');
    } finally {
      setSupportSubmitting(false);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const openPathFromNav = (path: LearningPath) => {
    setSelectedPath(path);
    setNavDropdown(null);
    setMobileOpen(false);
    scrollTo('paths');
  };

  const goToCoursesCategory = (category: string) => {
    setNavDropdown(null);
    setMobileOpen(false);
    navigate(`/cursos?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="elan-page">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" onClick={() => setMobileOpen(false)} data-testid="link-brand">Élan <ArrowUpRight size={19} strokeWidth={1.5} /></a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#about" data-testid="link-nav-about">Sobre Élan</a>
            <a href="#diagnostic" data-testid="link-nav-diagnostic">Orientación</a>

            <div className="nav-dropdown" data-testid="dropdown-nav-rutas">
              <button
                type="button"
                className="nav-dropdown-trigger nav-link-button"
                onClick={() => setNavDropdown((current) => (current === 'rutas' ? null : 'rutas'))}
                aria-expanded={navDropdown === 'rutas'}
                data-testid="button-nav-rutas"
              >
                Rutas <ChevronDown size={13} />
              </button>
              {navDropdown === 'rutas' && (
                <div className="nav-dropdown-panel" role="menu">
                  {learningPaths.map((path) => (
                    <button
                      type="button"
                      key={path.id}
                      className="nav-dropdown-item"
                      onClick={() => openPathFromNav(path)}
                      data-testid={`nav-dropdown-path-${path.id}`}
                    >
                      {path.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="nav-dropdown" data-testid="dropdown-nav-cursos">
              <button
                type="button"
                className="nav-dropdown-trigger nav-link-button"
                onClick={() => setNavDropdown((current) => (current === 'cursos' ? null : 'cursos'))}
                aria-expanded={navDropdown === 'cursos'}
                data-testid="button-nav-cursos"
              >
                Cursos <ChevronDown size={13} />
              </button>
              {navDropdown === 'cursos' && (
                <div className="nav-dropdown-panel nav-dropdown-panel-scroll" role="menu">
                  <button type="button" className="nav-dropdown-item" onClick={() => { setNavDropdown(null); scrollTo('courses'); }}>
                    Ver destacados
                  </button>
                  {courseCategories.map((category) => (
                    <button
                      type="button"
                      key={category}
                      className="nav-dropdown-item"
                      onClick={() => goToCoursesCategory(category)}
                      data-testid={`nav-dropdown-category-${category.replace(/[\s/]/g, '-')}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#news" data-testid="link-nav-news">Novedades</a>
            <a href="#jobs" data-testid="link-nav-jobs">Bolsa</a>
            <a className="header-cta" href="#cafecito" data-testid="link-nav-cafecito">Cafecito</a>
            <button className="mobile-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'} data-testid="button-mobile-menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
          {mobileOpen && (
            <nav className="mobile-menu" aria-label="Menú móvil">
              <a href="#about" onClick={() => setMobileOpen(false)} data-testid="link-mobile-about">Sobre Élan</a>
              <a href="#diagnostic" onClick={() => setMobileOpen(false)} data-testid="link-mobile-diagnostic">Orientación</a>
              <a href="#paths" onClick={() => setMobileOpen(false)} data-testid="link-mobile-paths">Rutas</a>
              <a href="#courses" onClick={() => setMobileOpen(false)} data-testid="link-mobile-courses">Cursos</a>
              <a href="#news" onClick={() => setMobileOpen(false)} data-testid="link-mobile-news">Novedades</a>
              <a href="#jobs" onClick={() => setMobileOpen(false)} data-testid="link-mobile-jobs">Bolsa</a>
              <a href="#cafecito" onClick={() => setMobileOpen(false)} data-testid="link-mobile-cafecito">Cafecito</a>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker">Un espacio para avanzar</div>
              <h1 data-testid="text-hero-title">Élan</h1>
              <h2>Impulso autodidacta para estudiantes de <span>tecnología.</span></h2>
              <p className="hero-description">La parte que la universidad deja entre líneas. Rutas, práctica y una comunidad para convertir teoría en algo que puedas mostrar.</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#paths" data-testid="button-explore-paths">Explorar rutas <ArrowUpRight size={16} /></a>
              </div>
              <label className="global-search hero-search" htmlFor="hero-course-search">
                <Search size={17} />
                <input id="hero-course-search" value={searchQuery} onChange={(event) => { setRecommendedCategories([]); setSearchQuery(event.target.value); }} placeholder="Buscar SQL, Python, Power BI..." aria-label="Buscar recursos por tecnología" data-testid="input-global-search-hero" />
              </label>
              <div className="hero-meta">
                <div><strong>{courses.length}</strong><span>cursos curados</span></div>
                <div><strong>{courseCategories.length}</strong><span>categorías</span></div>
                <div><strong>6</strong><span>rutas por perfil</span></div>
              </div>
            </div>
            <div className="network-panel" aria-label="Red de conceptos de aprendizaje">
              <svg className="network-svg" viewBox="0 0 460 430" role="img">
                <line className="node-line" x1="80" y1="116" x2="210" y2="215" /><line className="node-line" x1="210" y1="215" x2="354" y2="114" />
                <line className="node-line" x1="210" y1="215" x2="106" y2="335" /><line className="node-line" x1="210" y1="215" x2="357" y2="326" />
                <line className="node-line" x1="80" y1="116" x2="354" y2="114" /><line className="node-line" x1="106" y1="335" x2="357" y2="326" />
                <circle className="node" cx="80" cy="116" r="7" /><circle className="node" cx="354" cy="114" r="7" /><circle className="node" cx="106" cy="335" r="7" /><circle className="node" cx="357" cy="326" r="7" />
                <circle className="node" cx="210" cy="215" r="15" /><circle className="node-pulse" cx="210" cy="215" r="5" />
                <text className="node-label" x="52" y="94">TEORÍA</text><text className="node-label" x="330" y="92">PRÁCTICA</text>
                <text className="node-label" x="62" y="358">HÁBITOS</text><text className="node-label" x="335" y="351">MERCADO</text>
                <text className="node-label" x="194" y="253">TÚ</text>
              </svg>
            </div>
          </div>
          <div className="scroll-cue">desliza para empezar</div>
        </section>

        <section className="section about-section" id="about">
          <div className="container">
            <div className="section-heading"><span className="eyebrow">01 / la idea</span><h2>La carrera no termina en el aula. <em>Empieza ahí.</em></h2></div>
            <div className="about-layout">
              <div className="about-intro">
                <p className="about-signature">Hola, soy Daniela!.<br />Creadora y fundadora de Élan.</p>
                <p className="about-origin">Élan nació como una necesidad personal y comunitaria: centralizar y curar la innumerable cantidad de cursos, recursos y herramientas que existen dispersos en internet, para que no pierdas tiempo buscando qué estudiar.</p>
                <p className="about-lead">Élan es ese <strong>empujón concreto</strong> que aparece cuando ya entendiste la teoría, pero todavía no sabes qué construir con ella.</p>
              </div>
              <div className="about-copy">
                <article className="story-card"><span className="number">01</span><h3>Un impulso vital</h3><p>Élan es una palabra francesa: una fuerza interna que te pone en movimiento. No promete atajos; te ayuda a encontrar el siguiente paso.</p></article>
                <article className="story-card"><span className="number">02</span><h3>El puente que faltaba</h3><p>Entrá a probar estructuras de datos y resolver un problema real hay un territorio entero. Lo recorremos con proyectos y criterio.</p></article>
                <article className="story-card"><span className="number">03</span><h3>Aprender haciendo</h3><p>Para estudiantes de sistemas, backend, data e infraestructura que quieren salir del “sé la teoría” y entrar al “puedo hacerlo”.</p></article>
                <article className="story-card"><span className="number">04</span><h3>A tu ritmo</h3><p>Sesiones cortas, explicaciones honestas y herramientas para cuando solo tienes una hora libre antes de dormir.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="diagnostic">
          <div className="container">
            <div className="section-heading"><span className="eyebrow">02 / punto de partida</span><h2>¿Por dónde <em>arrancas</em>?</h2><p>Diez preguntas, una brújula inicial. No es un examen: es una forma de escucharte.</p></div>
            <div className="diagnostic-layout">
              <div className="panel" data-testid="panel-orientation-quiz">
                {!quizResult ? <>
                  <div className="panel-title"><div><h3>Test de orientación</h3><p>Elige lo que más se parezca a ti.</p></div><span className="step-count">{String(quizStep + 1).padStart(2, '0')} / {String(quizQuestions.length).padStart(2, '0')}</span></div>
                  <div className="quiz-progress"><span style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} /></div>
                  <div className="question">{quizQuestions[quizStep].question}</div>
                  <div className="option-list">{quizQuestions[quizStep].options.map((option, index) => <button className={`option ${quizAnswers[quizStep] === index ? 'selected' : ''}`} key={option.label} onClick={() => chooseAnswer(index)} data-testid={`button-quiz-option-${quizStep}-${index}`}><span className="option-mark">{String.fromCharCode(65 + index)}</span><span className="option-copy"><strong>{option.label}</strong></span></button>)}</div>
                  <div className="quiz-actions"><button className="btn btn-outline btn-small" disabled={quizStep === 0} onClick={() => setQuizStep(quizStep - 1)} data-testid="button-quiz-back"><ChevronLeft size={14} /> Atrás</button><button className="btn btn-primary btn-small" disabled={quizAnswers[quizStep] === undefined} onClick={submitQuiz} data-testid="button-quiz-next">{quizStep === quizQuestions.length - 1 ? 'Ver resultado' : 'Siguiente'} <ChevronRight size={14} /></button></div>
                </> : <div className="result-card"><div className="result-icon"><Sparkles size={19} /></div><span className="script">Tu próximo movimiento</span><h3>{quizResult}</h3><p>Tu resultado combina lo que te da curiosidad con el tipo de problemas que quieres resolver. Empieza con estos temas y deja que tu próxima evidencia te marque el siguiente paso.</p><div className="result-topics">{profileTopics[quizResult].map((topic) => <span key={topic}>{topic}</span>)}</div><button className="btn btn-primary btn-small" onClick={() => applyRecommendation(quizResult)} data-testid="button-result-resources">Ver recursos recomendados para mi perfil <ArrowUpRight size={14} /></button></div>}
              </div>
            </div>
          </div>
        </section>

        <section className="section paths-section" id="paths">
          <div className="container">
            <div className="section-heading"><span className="eyebrow">03 / recorridos</span><h2>Todo lo que necesitas para dar el <em>siguiente paso.</em></h2><p>Para estudiantes e interesados en tecnología: datos, desarrollo web, cloud, ciberseguridad, IA, testing, inglés y herramientas para tu primer trabajo. Centralizamos los mejores recursos para que pases del “sé la teoría” al “puedo hacerlo”.</p></div>
            <div className="path-list">
              {learningPaths.map((path) => <article className="path-item role-path-item" key={path.id} data-testid={`card-path-${path.id}`}><span className="path-number">{path.number}</span><div><h3>{path.title}</h3><p>{path.description}</p><div className="path-steps">{path.steps.slice(0, 5).map((step) => <i className="active" key={step.category} title={step.label} />)}</div></div><button className="btn btn-quiet btn-small" onClick={() => setSelectedPath(path)} data-testid={`button-path-${path.id}`}>Ver recorrido <ArrowUpRight size={14} /></button></article>)}
            </div>
            {selectedPath && <div className="path-modal-backdrop" role="presentation" onClick={() => setSelectedPath(null)}><section className="path-modal" role="dialog" aria-modal="true" aria-labelledby="path-modal-title" onClick={(event) => event.stopPropagation()}><div className="path-modal-header"><div><span className="eyebrow">Ruta por perfil</span><h3 id="path-modal-title">{selectedPath.title}</h3><p>{selectedPath.description}</p></div><button className="modal-close" onClick={() => setSelectedPath(null)} aria-label="Cerrar detalle de ruta" data-testid="button-close-path-modal"><X size={20} /></button></div><div className="path-detail-list">{selectedPath.steps.map((step, index) => { const course = courses.find((item) => item.category === step.category && item.featured)
  ?? courses.find((item) => item.category === step.category); return <div className="path-detail-step" key={step.category}><span className="path-detail-number">0{index + 1}</span><div className="path-detail-copy"><strong>{step.label}</strong>{course ? <span>{course.title} · {course.platform}</span> : <span>Recurso curado próximamente</span>}</div>{course ? <span className={`cost-badge ${course.costTone}`}>{course.cost}</span> : null}{course ? <a href={course.url} target="_blank" rel="noreferrer" className="path-detail-link" aria-label={`Abrir recurso de ${step.label}`}><ExternalLink size={14} /></a> : null}</div>; })}</div></section></div>}
          </div>
        </section>

        <section className="section" id="courses">
          <div className="container">
            <div className="section-heading"><span className="eyebrow">04 / piezas sueltas</span><h2>Una noche. Un tema.<br />  Un <em>avance.</em></h2><p>Élan no aloja cursos: encuentra recursos externos que valen tu tiempo, desde opciones gratuitas hasta formaciones pagas.</p></div>
            <label className="global-search catalog-search" htmlFor="catalog-course-search">
              <Search size={17} />
              <input id="catalog-course-search" value={searchQuery} onChange={(event) => { setRecommendedCategories([]); setSearchQuery(event.target.value); }} placeholder="Buscar por tecnología, plataforma o tema..." aria-label="Buscar recursos en el catálogo" data-testid="input-global-search-catalog" />
              {searchQuery && <button type="button" className="search-clear" onClick={() => setSearchQuery('')} aria-label="Limpiar búsqueda" data-testid="button-clear-search">Limpiar</button>}
            </label>

            <div className="toolbox-subsection">
              <div className="toolbox-heading"><div><span className="eyebrow">Caja de herramientas</span><h3>Cheatsheets para abrir y usar.</h3></div><p>Atajos públicos para esa sesión en la que necesitas recordar lo esencial y seguir construyendo.</p></div>
              <div className="toolbox-grid">
                {homeToolboxItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a className="toolbox-card" key={item.id} href={item.url} target="_blank" rel="noreferrer">
                      <Icon size={17} />
                      <span><strong>{item.title}</strong><small>{item.desc}</small></span>
                      <ExternalLink size={13} />
                    </a>
                  );
                })}
              </div>
              <div className="see-more-row">
                <Link href="/herramientas" className="btn btn-outline btn-small" data-testid="link-see-more-tools">
                  Ver más <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {recommendedCategories.length > 0 && <div className="recommendation-banner" data-testid="status-course-recommendation"><div><span>Tu selección · {quizResult}</span><strong>Mostrando recursos recomendados para tu perfil</strong></div><button className="filter active" onClick={resetCourseRecommendation} data-testid="button-reset-course-recommendation">Ver todos</button></div>}

            <div className="course-grid">{homeCourses.length ? homeCourses.map((course) => { const Icon = course.icon; return <article className="course-card" key={course.id} data-testid={`card-course-${course.id}`}><div className="card-top"><span>{course.category}</span><Icon size={19} /></div><div className="course-source"><span>Fuente</span><strong>{course.platform}</strong></div><h3>{course.title}</h3><p>{course.desc}</p><div className="course-meta"><span>{course.time}</span><span className={`cost-badge ${course.costTone}`}>{course.cost}</span></div><div className="course-bottom"><span className="curated-note">Recurso externo</span><a className="btn btn-outline btn-small" href={course.url} target="_blank" rel="noreferrer" data-testid={`link-course-${course.id}`}>Abrir recurso <ExternalLink size={12} /></a></div></article>; }) : <div className="empty-state" data-testid="empty-courses">Todavía no hay cursos en esta categoría. Prueba otra ruta.</div>}</div>

            {isHomeCoursesLimited && (
              <div className="see-more-row">
                <Link href="/cursos" className="btn btn-outline" data-testid="link-see-more-courses">
                  Ver más cursos <ArrowUpRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="section" id="news">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">05 / al día</span>
              <h2>Lo que estamos <em>anotando.</em></h2>
              <p>Ideas, lanzamientos y señales del mercado para que tu aprendizaje tenga contexto.</p>
            </div>

            <div className="news-grid">
              {homeNewsItems.map((item) => {
                const content = (
                  <>
                    <span>{item.tag} · {item.readTime}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </>
                );
                return item.url ? (
                  <a
                    className="news-card"
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-news-${item.id}`}
                  >
                    {content}
                  </a>
                ) : (
                  <article className="news-card" key={item.id} data-testid={`card-news-${item.id}`}>
                    {content}
                  </article>
                );
              })}
            </div>

            <div className="see-more-row">
              <Link href="/novedades" className="btn btn-outline btn-small" data-testid="link-see-more-news">
                Ver más <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section className="section jobs-section" id="jobs">
          <div className="container jobs-layout">
            <div className="jobs-intro">
              <span className="eyebrow">06 / siguiente estación</span>
              <h2>Oportunidades con los pies en la tierra.</h2>
              <p>Plataformas reales donde buscar tu próxima oportunidad — nosotros no publicamos vacantes, te acercamos dónde encontrarlas.</p>
              <a className="btn btn-outline btn-small" href="#support">¿Tienes una oportunidad? <Send size={13} /></a>
            </div>
            <div>
              <div className="job-list">
                {homeJobs.map((job) => (
                  <a className="job-row" key={job.id} href={job.url} target="_blank" rel="noreferrer" data-testid={`row-job-${job.id}`}>
                    <div>
                      <h3>{job.name}</h3>
                      <span className="job-company">{job.description}</span>
                      <div className="job-tags">{job.tags.map((tag) => <span className="job-tag" key={tag}>{tag}</span>)}</div>
                    </div>
                    <span className="job-location"><MapPin size={12} />{job.location}</span>
                  </a>
                ))}
              </div>
              <div className="see-more-row">
                <a href="/empleos" target="_blank" rel="noreferrer" className="btn btn-outline btn-small" data-testid="link-see-more-jobs">
                  Ver más <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="support">
          <div className="container support-grid"><div className="support-copy"><span className="eyebrow">07 / estamos cerca</span><h2>Una duda también es un <em>avance.</em></h2><p>¿Te trabaste con una ruta? ¿Tienes una idea para un taller? Déjanos una nota. Leemos cada mensaje y respondemos con algo accionable.</p><div className="support-note">No tienes que poder con todo hoy.</div></div><form className="support-form" onSubmit={submitSupport} data-testid="form-support"><div className="field"><label htmlFor="support-name">Nombre</label><input id="support-name" name="name" required value={supportForm.name} onChange={(event) => setSupportForm((form) => ({ ...form, name: event.target.value }))} placeholder="Tu nombre" data-testid="input-support-name" /></div><div className="field"><label htmlFor="support-email">Email</label><input id="support-email" name="email" required type="email" value={supportForm.email} onChange={(event) => setSupportForm((form) => ({ ...form, email: event.target.value }))} placeholder="tu@email.com" data-testid="input-support-email" /></div><div className="field full"><label htmlFor="support-subject">Asunto</label><input id="support-subject" name="subject" required value={supportForm.subject} onChange={(event) => setSupportForm((form) => ({ ...form, subject: event.target.value }))} placeholder="¿Qué tienes en mente?" data-testid="input-support-subject" /></div><div className="field full"><label htmlFor="support-message">Mensaje</label><textarea id="support-message" name="message" required value={supportForm.message} onChange={(event) => setSupportForm((form) => ({ ...form, message: event.target.value }))} placeholder="Cuéntanos dónde estás..." data-testid="input-support-message" /></div>{supportSent && <div className="form-feedback" data-testid="status-support-sent"><CheckCircle2 size={14} /> ¡Nota enviada con éxito! Te responderemos muy pronto a tu casilla.</div>}{supportError && <div className="form-error" role="alert" data-testid="status-support-error">{supportError}</div>}<button className="btn btn-primary" type="submit" disabled={supportSubmitting} data-testid="button-submit-support">{supportSubmitting ? 'Enviando...' : 'Enviar nota'} {!supportSubmitting && <Send size={15} />}</button></form></div>
        </section>

        <section className="coffee" id="cafecito"><div className="container coffee-card"><div><span className="eyebrow">08 / cafecito</span><h2>El impulso también se comparte.</h2><p className="coffee-message">Si Élan te ayudó a encontrar tu camino, a organizar tus estudios o a ahorrar horas de búsqueda, podés invitarme un cafecito para seguir manteniendo la plataforma viva. ¡Gracias por el apoyo!</p><p className="coffee-subtext">Creado por Daniela! • Colaboraciones a voluntad</p></div><a className="cafecito-badge" href="https://cafecito.app/elanestudia" rel="noopener noreferrer" target="_blank"><img srcSet="https://cdn.cafecito.app/imgs/buttons/button_2.png 1x, https://cdn.cafecito.app/imgs/buttons/button_2_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_2_3.75x.png 3.75x" src="https://cdn.cafecito.app/imgs/buttons/button_2.png" alt="Invitame un café en cafecito.app" /></a></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><div className="footer-copy"><strong>Élan</strong><br />Hecho por y para estudiantes de tecnología.</div><div className="footer-links"><a href="#about">Sobre Élan</a><a href="#paths">Rutas</a><a href="#jobs">Bolsa</a><a href="#support">Soporte</a><a href="#cafecito">Colaborar</a></div><span className="footer-copy">© 2026 · Con calma y código.</span></div></footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/cursos" component={CoursesPage} />
        <Route path="/herramientas" component={ToolsPage} />
        <Route path="/empleos" component={JobsPage} />
        <Route path="/novedades" component={NewsPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;