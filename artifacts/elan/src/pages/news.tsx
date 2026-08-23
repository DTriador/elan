import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { newsItems } from '@/data/news';

export default function NewsPage() {
  return (
    <div className="elan-page">
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" data-testid="link-brand-news">
            Élan <ArrowUpRight size={19} strokeWidth={1.5} />
          </Link>
        </div>
      </header>
      <main>
        <section className="section" id="news-full">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Novedades</span>
              <h2>Todo lo que estamos <em>anotando.</em></h2>
              <p>Ideas, lanzamientos y señales del mercado para que tu aprendizaje tenga contexto.</p>
            </div>
            <div className="news-grid">
              {newsItems.map((item) => {
                const content = (
                  <>
                    <span>{item.tag} · {item.readTime}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </>
                );
                return item.url ? (
                  <a className="news-card" key={item.id} href={item.url} target="_blank" rel="noreferrer" data-testid={`link-news-${item.id}`}>
                    {content}
                  </a>
                ) : (
                  <article className="news-card" key={item.id} data-testid={`card-news-${item.id}`}>
                    {content}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}