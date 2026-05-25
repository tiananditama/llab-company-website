// ApproachPage.jsx — full-page Approach view, accessible via navbar
// Same mood-aware shell as the home pages: navbar + hero block + the
// existing Approach manifesto + footer.

const OP_GLYPHS = ["÷", "×", "−", "+"];

function CyclingOperator() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % OP_GLYPHS.length), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="bracket" aria-hidden="true">
      [<span key={i} className="op">{OP_GLYPHS[i]}</span>]
    </span>
  );
}

// Mirror the responsive font-size steps applied to .approach-hero-title in
// responsive.css so the particle canvas shrinks in lockstep with "BRAVE".
function pickHeroFontPx() {
  if (typeof window === "undefined") return 72;
  const w = window.innerWidth;
  if (w <= 600) return 36;
  if (w <= 900) return 44;
  return 72;
}

function ApproachPage({ mood, onFlip, onLogo, onNav }) {
  const wrap = mood === "experimental" ? "exp-home" : "brave-home";
  const [heroFontPx, setHeroFontPx] = React.useState(pickHeroFontPx);
  React.useEffect(() => {
    const onResize = () => setHeroFontPx(pickHeroFontPx());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <div className={`${wrap} page-padded`}>
      <Navbar mood={mood} onFlip={onFlip} onLogo={onLogo} onNav={onNav} active="approach" />

      <section className="approach-hero">
        <div className="approach-hero-title">
          <span>BRAVE</span>
          <CyclingOperator />
          <ExperimentalParticles mood={mood} fontPx={heroFontPx} />
        </div>
        <div className="approach-hero-slot">
          <video
            src="assets/approach-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>

      <Approach />

      <Footer mood={mood} onFlip={onFlip} onNav={onNav} />
    </div>
  );
}

window.ApproachPage = ApproachPage;
