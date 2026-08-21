import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, ChevronDown, ExternalLink, Search } from 'lucide-react';
import { courses } from '@/data/courses';

function getInitialCategory(): string {
  if (typeof window === 'undefined') return 'Todos';
  const params = new URLSearchParams(window.location.search);
  return params.get('category') || 'Todos';
}

export default function CoursesPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>(getInitialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = useMemo(() => {
    const seen: string[] = [];
    courses.forEach((course) => {
      if (!seen.includes(course.category)) seen.push(course.category);
    });
    return seen;
  }, []);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      return courses.filter((course) =>
        [course.category, course.title, course.desc, course.platform].some((field) =>
          field.toLowerCase().includes(query)
        )
      );
    }
    return categoryFilter === 'Todos' ? courses : courses.filter((course) => course.category === categoryFilter);
  }, [categoryFilter, searchQuery]);

  return (
    <div className="elan-page">
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" data-testid="link-brand-courses">
            Élan <ArrowUpRight size={19} strokeWidth={1.5} />
          </Link>
        </div>
      </header>
      <main>
        <section className="section" id="courses-full">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Cursos</span>
              <h2>Todos los <em>cursos.</em></h2>
              <p>Explorá por categoría o buscá por tecnología, plataforma o tema.</p>
            </div>

            <label className="global-search catalog-search" htmlFor="courses-page-search">
              <Search size={17} />
              <input
                id="courses-page-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Buscar por tecnología, plataforma o tema..."
                aria-label="Buscar cursos"
                data-testid="input-search-courses-page"
              />
              {searchQuery && (
                <button type="button" className="search-clear" onClick={() => setSearchQuery('')} data-testid="button-clear-search-courses-page">
                  Limpiar
                </button>
              )}
            </label>

            <div className="nav-dropdown" data-testid="dropdown-courses-category">
              <button
                type="button"
                className="btn btn-outline btn-small nav-dropdown-trigger"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-expanded={dropdownOpen}
                data-testid="button-toggle-category-dropdown"
              >
                {categoryFilter} <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown-panel" role="menu">
                  <button
                    type="button"
                    className={`nav-dropdown-item ${categoryFilter === 'Todos' ? 'active' : ''}`}
                    onClick={() => { setCategoryFilter('Todos'); setSearchQuery(''); setDropdownOpen(false); }}
                  >
                    Todos
                  </button>
                  {categories.map((category) => (
                    <button
                      type="button"
                      key={category}
                      className={`nav-dropdown-item ${categoryFilter === category ? 'active' : ''}`}
                      onClick={() => { setCategoryFilter(category); setSearchQuery(''); setDropdownOpen(false); }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="course-grid">
              {filteredCourses.length ? filteredCourses.map((course) => {
                const Icon = course.icon;
                return (
                  <article className="course-card" key={course.id} data-testid={`card-course-${course.id}`}>
                    <div className="card-top"><span>{course.category}</span><Icon size={19} /></div>
                    <div className="course-source"><span>Fuente</span><strong>{course.platform}</strong></div>
                    <h3>{course.title}</h3>
                    <p>{course.desc}</p>
                    <div className="course-meta">
                      <span>{course.time}</span>
                      <span className={`cost-badge ${course.costTone}`}>{course.cost}</span>
                    </div>
                    <div className="course-bottom">
                      <span className="curated-note">Recurso externo</span>
                      <a className="btn btn-outline btn-small" href={course.url} target="_blank" rel="noreferrer" data-testid={`link-course-${course.id}`}>
                        Abrir recurso <ExternalLink size={12} />
                      </a>
                    </div>
                  </article>
                );
              }) : (
                <div className="empty-state" data-testid="empty-courses-page">Todavía no hay cursos en esta categoría.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}