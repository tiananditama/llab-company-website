// IntroBlock.jsx — manifesto band. Brave: green stripe.
// Experimental: floating liquid-glass card (matches the marquee treatment).
function IntroBlock({ variant = "default" }) {
  const body = (
    <p>
      <strong>LLAB</strong> is an integrated creative agency built for the <strong>brave</strong> and the <strong>experimental.</strong> We create bold ideas that demand attention and <strong>drive real results.</strong>
    </p>
  );

  if (variant === "glass") {
    return (
      <div className="intro-glass-wrap">
        <div className="intro-glass-aura" aria-hidden="true"></div>
        <section className="intro-block intro-block--glass">{body}</section>
      </div>
    );
  }

  return <section className="intro-block">{body}</section>;
}

window.IntroBlock = IntroBlock;
