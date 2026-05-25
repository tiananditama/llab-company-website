// ProjectsPage.jsx — full-page index of all case studies (the PROJECTS link)
function ProjectsPage({ mood, onFlip, onLogo, onNav, onProject }) {
  const wrap = mood === "experimental" ? "exp-home" : "brave-home";
  const list = window.PROJECTS || [];
  return (
    <div className={`${wrap} page-padded`}>
      <Navbar mood={mood} onFlip={onFlip} onLogo={onLogo} onNav={onNav} active="projects" />

      <section className="projects-hero">
        <div className="projects-hero-eyebrow">PROJECTS · {String(list.length).padStart(2, "0")}</div>
        <h1>Best of LLAB.</h1>
        <p>Top hits from our repertoire — from branding to editorial to strategy to visual identity.</p>
      </section>

      <section className={`projects ${mood} projects--page`}>
        <div className="projects-grid">
          {list.map((p) => (
            <ProjectThumb key={p.slug} data={p} mood={mood} onClick={() => onProject?.(p)} />
          ))}
        </div>
      </section>

      <Footer mood={mood} onFlip={onFlip} onNav={onNav} />
    </div>
  );
}

window.ProjectsPage = ProjectsPage;
