// ProjectCard.jsx + Projects.jsx — case-study tiles and the grid that holds them

const PROJECTS = [
  { id: "024", title: "Phantom Wing\nidentity rebuild",   tag: "BRANDING · 2024",  art: "linear-gradient(135deg,#797979 0%, #1A1B16 100%)" },
  { id: "023", title: "Quiet Riot\nbroadcast film",        tag: "FILM · 2024",      art: "radial-gradient(120% 80% at 30% 20%, #AEFE00 0%, #0E3D14 40%, #0A0B08 100%)" },
  { id: "022", title: "Mainframe\ncampaign launch",        tag: "CAMPAIGN · 2023",  art: "linear-gradient(225deg,#F4F4EF 0%, #797979 60%, #0A0B08 100%)" },
  { id: "021", title: "Bowery & Sons\npackaging system",   tag: "PACKAGING · 2023", art: "conic-gradient(from 220deg at 60% 40%, #1A1B16, #797979, #1A1B16)" },
];

function ProjectCard({ data, mood, onClick }) {
  return (
    <article className={`project-card ${mood}`} onClick={onClick}>
      <div className="thumb" style={{ background: data.art }} />
      <div className="meta-row">
        <span className="num">CASE · {data.id}</span>
        <span>{data.tag}</span>
      </div>
      <h3>{data.title.split("\n").map((l,i) => <React.Fragment key={i}>{l}<br/></React.Fragment>)}</h3>
    </article>
  );
}

function Projects({ mood, onProject }) {
  return (
    <section className={`projects ${mood}`}>
      <div className="head">
        <h2>Selected work.</h2>
        <span className="meta">VOL.024 · 04 / 28</span>
      </div>
      <div className="projects-grid">
        {PROJECTS.map(p => (
          <ProjectCard key={p.id} data={p} mood={mood} onClick={() => onProject?.(p)} />
        ))}
      </div>
    </section>
  );
}

window.ProjectCard = ProjectCard;
window.Projects = Projects;
