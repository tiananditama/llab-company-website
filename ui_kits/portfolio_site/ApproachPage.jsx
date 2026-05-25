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

function ApproachPage({ mood, onFlip, onLogo, onNav }) {
  const wrap = mood === "experimental" ? "exp-home" : "brave-home";
  return (
    <div className={`${wrap} page-padded`}>
      <Navbar mood={mood} onFlip={onFlip} onLogo={onLogo} onNav={onNav} active="approach" />

      <section className="approach-hero">
        <div className="approach-hero-title">
          <span>BRAVE</span>
          <CyclingOperator />
          <span>EXPERIMENTAL</span>
        </div>
        <div className="approach-hero-slot" role="img" aria-label="Featured imagery — to be supplied">
          <span className="approach-img-label">IMG · HERO</span>
        </div>
      </section>

      <Approach />

      <Footer mood={mood} onFlip={onFlip} onNav={onNav} />
    </div>
  );
}

window.ApproachPage = ApproachPage;
