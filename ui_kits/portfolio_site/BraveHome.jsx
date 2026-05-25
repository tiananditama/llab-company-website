// BraveHome.jsx — dark hero with looping brave.mp4 background
function BraveHome({ onFlip, onLogo, onNav, onProject }) {
  return (
    <div className="brave-home">
      <Navbar mood="brave" onFlip={onFlip} onLogo={onLogo} onNav={onNav} active="home" />
      <section className="hero-brave">
        <video
          className="hero-video"
          src="../../assets/brave.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-video-tint"></div>
        <div className="hero-copy">
          <h1>Bold ideas.<br/>Real <em>results.</em></h1>
          <p className="lede">
            LLAB is an integrated creative agency built for the brave. We make work that demands attention — and earns it.
          </p>
          <div className="cta-row">
            <Button variant="green" onClick={() => onNav && onNav("projects")}>See the work</Button>
            <Button variant="outline" onClick={() => onNav && onNav("approach")}>Our approach</Button>
          </div>
        </div>
      </section>
      <IntroBlock />
      <Approach />
      <Marquee />
      <Projects mood="brave" onProject={onProject} />
      <Footer mood="brave" onFlip={onFlip} onNav={onNav} />
    </div>
  );
}

window.BraveHome = BraveHome;
