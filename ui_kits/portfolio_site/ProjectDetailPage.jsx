// ProjectDetailPage.jsx — full case-study view
// Hero (title + intro + first media), then alternating body sections and
// media, then a stats row, then "Next project" navigation.

function MediaBlock({ item }) {
  if (item.type === "video") {
    return (
      <div className="pd-media">
        <video src={item.src} autoPlay loop muted playsInline />
      </div>
    );
  }
  return (
    <div className="pd-media">
      <img src={item.src} alt="" loading="lazy" />
    </div>
  );
}

function ProjectDetailPage({ project, mood, onFlip, onLogo, onNav, onProject }) {
  const wrap = mood === "experimental" ? "exp-home" : "brave-home";
  const all = window.PROJECTS || [];
  const idx = all.findIndex((p) => p.slug === project.slug);
  const next = idx >= 0 ? all[(idx + 1) % all.length] : null;

  // Scroll to top whenever the slug changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [project.slug]);

  return (
    <div className={`${wrap} page-padded project-detail`}>
      <Navbar mood={mood} onFlip={onFlip} onLogo={onLogo} onNav={onNav} active="projects" />

      <section className="pd-hero">
        <div className="pd-hero-meta">
          <span className="pd-num">CASE · {project.num}</span>
          <span className="pd-cat">{project.category}</span>
        </div>
        <h1 className="pd-title">{project.title}</h1>
        <div className="pd-client">{project.client}</div>
      </section>

      <MediaBlock item={project.hero} />

      <section className="pd-intro">
        <p>{project.intro}</p>
      </section>

      {project.body.map((sec, i) => (
        <section key={i} className="pd-section">
          <h2>{sec.heading}</h2>
          <div className="pd-section-body">
            {sec.copy.split("\n\n").map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </div>
        </section>
      ))}

      {project.media.map((item, i) => (
        <MediaBlock key={i} item={item} />
      ))}

      {project.metrics && project.metrics.length > 0 && (
        <section className="pd-metrics">
          <h2 className="pd-metrics-title">Results.</h2>
          <div className="pd-metrics-grid" style={{ gridTemplateColumns: `repeat(${Math.min(project.metrics.length, 4)}, 1fr)` }}>
            {project.metrics.map((m, i) => (
              <div key={i} className="pd-metric">
                <div className="pd-metric-num">{m.number}</div>
                <div className="pd-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {next && (
        <section className="pd-next" onClick={() => onProject?.(next)} role="button">
          <div className="pd-next-eyebrow">NEXT PROJECT — CASE · {next.num}</div>
          <div className="pd-next-title">{next.shortTitle} <span className="arr">→</span></div>
        </section>
      )}

      <Footer mood={mood} onFlip={onFlip} onNav={onNav} />
    </div>
  );
}

window.ProjectDetailPage = ProjectDetailPage;
