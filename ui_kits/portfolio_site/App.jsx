// App.jsx — top-level router. Tracks (mood, page) and renders the right shell.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "gatewaySmall": 36,
  "gatewayBig": 144
}/*EDITMODE-END*/;

function App() {
  // mood: null = gateway, "brave" | "experimental" = inside the site
  const [mood, setMood] = React.useState(null);
  // page: "home" | "approach" | "projects" | "contact"
  const [page, setPage] = React.useState("home");
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const flip = () => setMood(mood === "brave" ? "experimental" : "brave");
  const goGateway = () => { setMood(null); setPage("home"); };
  const goHome = () => setPage("home");
  const onNav = (key) => {
    if (key === "home") setPage("home");
    else setPage(key);
  };

  // Pick & route
  let body;
  if (mood === null) {
    // From the gateway, clicking a nav link picks Brave by default so the
    // route actually goes somewhere useful.
    const onNavFromGateway = (key) => {
      setMood("brave");
      setPage(key === "home" ? "home" : key);
    };
    body = <Gateway onPick={(m) => { setMood(m); setPage("home"); }} onFlip={flip} onNav={onNavFromGateway} smallSize={t.gatewaySmall} bigSize={t.gatewayBig} />;
  } else if (page === "approach") {
    body = <ApproachPage mood={mood} onFlip={flip} onLogo={goHome} onNav={onNav} />;
  } else if (page === "contact") {
    body = <ContactPage mood={mood} onFlip={flip} onLogo={goHome} onNav={onNav} />;
  } else if (mood === "brave") {
    body = <BraveHome onFlip={flip} onLogo={goHome} onNav={onNav} />;
  } else {
    body = <ExperimentalHome onFlip={flip} onLogo={goHome} onNav={onNav} />;
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
