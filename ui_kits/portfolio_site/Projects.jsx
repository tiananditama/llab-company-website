// Projects.jsx — Selected work grid. Reads from window.PROJECTS.
function ProjectThumb({ data, mood, onClick }) {
  return (
    <article className={`project-card ${mood}`} onClick={onClick}>
      <div className="thumb">
        {data.hero.type === "video" ? (
          <video src={data.hero.src} autoPlay loop muted playsInline />
        ) : (
          <img src={data.hero.src} alt={data.title} loading="lazy" />
        )}
      </div>
      <div className="meta-row">
        <span className="num">CASE · {data.num}</span>
        <span>{data.category}</span>
      </div>
      <h3>{data.shortTitle}</h3>
    </article>
  );
}

function Projects({ mood, onProject }) {
  const list = (window.PROJECTS || []).slice(0, 8);
  return (
    <section className={`projects ${mood}`}>
      <div className="head">
        <h2>Selected work.</h2>
        <span className="meta">VOL.024 · {String(list.length).padStart(2, "0")} / {String((window.PROJECTS || []).length).padStart(2, "0")}</span>
      </div>
      <div className="projects-grid">
        {list.map((p) => (
          <ProjectThumb key={p.slug} data={p} mood={mood} onClick={() => onProject?.(p)} />
        ))}
      </div>
    </section>
  );
}

window.ProjectThumb = ProjectThumb;
window.Projects = Projects;
