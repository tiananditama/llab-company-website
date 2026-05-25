// App.jsx — top-level router. Tracks (mood, page, projectSlug).
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "gatewaySmall": 36,
  "gatewayBig": 144
}/*EDITMODE-END*/;

function App() {
  // Initial state — either restore from history.state (e.g. user reloaded
  // mid-navigation) or default to the gateway.
  const initial = (typeof window !== "undefined" && window.history.state && window.history.state.__llab)
    ? window.history.state.__llab
    : { mood: null, page: "home", projectSlug: null };
  const [mood, setMood] = React.useState(initial.mood);
  const [page, setPage] = React.useState(initial.page);
  // null = index/grid view; a slug = detail view for that project
  const [projectSlug, setProjectSlug] = React.useState(initial.projectSlug);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // History sync: push a new entry whenever (mood, page, projectSlug) changes
  // so the browser back button walks through navigation instead of
  // exiting the site. Initial mount uses replaceState so we don't
  // immediately push a duplicate entry.
  const isFirstSync = React.useRef(true);
  React.useEffect(() => {
    const state = { __llab: { mood, page, projectSlug } };
    if (isFirstSync.current) {
      isFirstSync.current = false;
      window.history.replaceState(state, "");
    } else {
      window.history.pushState(state, "");
    }
  }, [mood, page, projectSlug]);

  // Restore state when the user presses back/forward.
  React.useEffect(() => {
    const onPop = (e) => {
      const s = (e.state && e.state.__llab) || { mood: null, page: "home", projectSlug: null };
      // Don't re-trigger the push effect for this restore.
      isFirstSync.current = true;
      setMood(s.mood);
      setPage(s.page);
      setProjectSlug(s.projectSlug);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

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
