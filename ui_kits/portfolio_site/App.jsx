// App.jsx — top-level router. Tracks (mood, page, projectSlug).
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "gatewaySmall": 36,
  "gatewayBig": 144
}/*EDITMODE-END*/;

function App() {
  const [mood, setMood] = React.useState(null);
  const [page, setPage] = React.useState("home");
  // null = index/grid view; a slug = detail view for that project
  const [projectSlug, setProjectSlug] = React.useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const flip = () => setMood(mood === "brave" ? "experimental" : "brave");
  const goGateway = () => { setMood(null); setPage("home"); setProjectSlug(null); };
  const goHome = () => { setPage("home"); setProjectSlug(null); };
  const onNav = (key) => {
    setProjectSlug(null);
    setPage(key === "home" ? "home" : key);
  };
  const onProject = (p) => {
    setPage("projects");
    setProjectSlug(p.slug);
  };

  let body;
  if (mood === null) {
    const onNavFromGateway = (key) => {
      setMood("brave");
      setPage(key === "home" ? "home" : key);
    };
    body = <Gateway onPick={(m) => { setMood(m); setPage("home"); }} onFlip={flip} onNav={onNavFromGateway} smallSize={t.gatewaySmall} bigSize={t.gatewayBig} />;
  } else if (page === "projects" && projectSlug) {
    const proj = (window.PROJECTS || []).find((p) => p.slug === projectSlug);
    body = proj
      ? <ProjectDetailPage project={proj} mood={mood} onFlip={flip} onLogo={goHome} onNav={onNav} onProject={onProject} />
      : <ProjectsPage mood={mood} onFlip={flip} onLogo={goHome} onNav={onNav} onProject={onProject} />;
  } else if (page === "projects") {
    body = <ProjectsPage mood={mood} onFlip={flip} onLogo={goHome} onNav={onNav} onProject={onProject} />;
  } else if (page === "approach") {
    body = <ApproachPage mood={mood} onFlip={flip} onLogo={goHome} onNav={onNav} />;
  } else if (page === "contact") {
    body = <ContactPage mood={mood} onFlip={flip} onLogo={goHome} onNav={onNav} />;
  } else if (mood === "brave") {
    body = <BraveHome onFlip={flip} onLogo={goHome} onNav={onNav} onProject={onProject} />;
  } else {
    body = <ExperimentalHome onFlip={flip} onLogo={goHome} onNav={onNav} onProject={onProject} />;
  }

  return (
    <div id="app">
      {body}

      <TweaksPanel>
        <TweakSection label="Gateway title" />
        <TweakSlider label='"HOW ARE YOU"' value={t.gatewaySmall} min={16} max={160} step={2} unit="px"
                     onChange={(v) => setTweak('gatewaySmall', v)} />
        <TweakSlider label='"FEELING?"'   value={t.gatewayBig}   min={48} max={420} step={2} unit="px"
                     onChange={(v) => setTweak('gatewayBig', v)} />
        <TweakButton label="Back to gateway" onClick={goGateway} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
