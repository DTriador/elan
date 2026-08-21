import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { jobBoards } from '@/data/jobs';

export default function JobsPage() {
  const [jobFilter, setJobFilter] = useState('Todos');

  const filteredJobs = useMemo(
    () => (jobFilter === 'Todos' ? jobBoards : jobBoards.filter((board) => board.tags.includes(jobFilter))),
    [jobFilter]
  );

  return (
    <div className="elan-page">
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" data-testid="link-brand-jobs">
            Élan <ArrowUpRight size={19} strokeWidth={1.5} />
          </Link>
        </div>
      </header>
      <main>
        <section className="section jobs-section" id="jobs-full">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Bolsa de trabajo</span>
              <h2>Todas las <em>plataformas.</em></h2>
              <p>El listado completo de bolsas y plataformas para buscar tu próxima oportunidad.</p>
            </div>

            <div className="filter-row" role="group" aria-label="Filtrar empleos">
              {['Todos', 'Remote', 'Junior', 'Data', 'Dev'].map((filter) => (
                <button
                  className={`filter ${jobFilter === filter ? 'active' : ''}`}
                  key={filter}
                  onClick={() => setJobFilter(filter)}
                  data-testid={`button-filter-job-page-${filter}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="job-list">
              {filteredJobs.length ? filteredJobs.map((job) => (
                <a className="job-row" key={job.id} href={job.url} target="_blank" rel="noreferrer" data-testid={`row-job-page-${job.id}`}>
                  <div>
                    <h3>{job.name}</h3>
                    <span className="job-company">{job.description}</span>
                    <div className="job-tags">{job.tags.map((tag) => <span className="job-tag" key={tag}>{tag}</span>)}</div>
                  </div>
                  <span className="job-location"><MapPin size={12} />{job.location}</span>
                </a>
              )) : (
                <div className="empty-state" data-testid="empty-jobs-page">No encontramos coincidencias. Cambia el filtro y vuelve a mirar.</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}