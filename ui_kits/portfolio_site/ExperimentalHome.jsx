// ExperimentalHome.jsx — light, full-bleed abstract hero
function ExperimentalHome({ onFlip, onLogo, onNav }) {
  return (
    <div className="exp-home">
      <section className="exp-hero">
        <video
          className="hero-video"
          src="../../assets/experimental-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-video-tint hero-video-tint--light"></div>
        <div className="copy">
          <h1>Experimental.</h1>
          <p>What happens when you stop asking permission. Work made in the studio, not the deck.</p>
          <div className="cta-row">
            <Button variant="green">See the work</Button>
            <Button variant="outline-light" onClick={() => onNav && onNav("approach")}>Our approach</Button>
          </div>
        </div>
      </section>
      <Navbar mood="experimental" onFlip={onFlip} onLogo={onLogo} onNav={onNav} active="home" />
      <IntroBlock variant="glass" />
      <Approach />
      <Marquee variant="glass" />
      <Projects mood="experimental" />
      <Footer mood="experimental" onFlip={onFlip} onNav={onNav} />
    </div>
  );
}

window.ExperimentalHome = ExperimentalHome;
