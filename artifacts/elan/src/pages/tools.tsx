import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, ChevronDown, ExternalLink } from 'lucide-react';
import { toolboxItems } from '@/data/toolbox';

function getInitialCategory(): string {
  if (typeof window === 'undefined') return 'Todos';
  const params = new URLSearchParams(window.location.search);
  return params.get('category') || 'Todos';
}

export default function ToolsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>(getInitialCategory);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = useMemo(() => {
    const seen: string[] = [];
    toolboxItems.forEach((item) => {
      if (!seen.includes(item.category)) seen.push(item.category);
    });
    return seen;
  }, []);

  const filteredItems = useMemo(() => {
    return categoryFilter === 'Todos'
      ? toolboxItems
      : toolboxItems.filter((item) => item.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="elan-page">
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" data-testid="link-brand-tools">
            Élan <ArrowUpRight size={19} strokeWidth={1.5} />
          </Link>
        </div>
      </header>
      <main>
        <section className="section" id="tools-full">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Caja de herramientas</span>
              <h2>Todos los <em>recursos.</em></h2>
              <p>Cheatsheets, canales y plataformas puntuales para cuando necesitás recordar algo rápido.</p>
            </div>

            <div className="nav-dropdown" data-testid="dropdown-tools-category">
              <button
                type="button"
                className="btn btn-outline btn-small nav-dropdown-trigger"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-expanded={dropdownOpen}
                data-testid="button-toggle-tools-category-dropdown"
              >
                {categoryFilter} <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown-panel" role="menu">
                  <button
                    type="button"
                    className={`nav-dropdown-item ${categoryFilter === 'Todos' ? 'active' : ''}`}
                    onClick={() => { setCategoryFilter('Todos'); setDropdownOpen(false); }}
                  >
                    Todos
                  </button>
                  {categories.map((category) => (
                    <button
                      type="button"
                      key={category}
                      className={`nav-dropdown-item ${categoryFilter === category ? 'active' : ''}`}
                      onClick={() => { setCategoryFilter(category); setDropdownOpen(false); }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="toolbox-grid">
              {filteredItems.length ? filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a className="toolbox-card" key={item.id} href={item.url} target="_blank" rel="noreferrer" data-testid={`link-tool-${item.id}`}>
                    <Icon size={17} />
                    <span><strong>{item.title}</strong><small>{item.desc}</small></span>
                    <ExternalLink size={13} />
                  </a>
                );
              }) : (
                <div className="empty-state" data-testid="empty-tools-page">Todavía no hay recursos en esta categoría.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}