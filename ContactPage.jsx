// ContactPage.jsx — Singapore-block map + contact details
// Mood-aware shell. The map is an inline SVG (thin strokes, mono labels),
// drawn to feel like a hand-marked street plan rather than a real map tile.

function ContactMap() {
  return (
    <img
      className="contact-map"
      src="../../assets/contact-map.png"
      alt="Map showing LLAB at 24 Duxton Road, surrounded by Maybank, OCBC, Central @ Clark Quay, Punch, Lumo, and Dopa Dopa" />);


}

function ContactPage({ mood, onFlip, onLogo, onNav }) {
  const wrap = mood === "experimental" ? "exp-home" : "brave-home";
  return (
    <div className={`${wrap} page-padded`}>
      <Navbar mood={mood} onFlip={onFlip} onLogo={onLogo} onNav={onNav} active="contact" />

      <section className="contact-hero" style={{ padding: "60px 80px 160px" }}>
        <div className="contact-hero-copy">
          <h1>
            Interested in what we do<br />
            or what you can possibly do around us?
          </h1>
          <p className="contact-hero-note">
            *This should give u a clear indicator<br />
            of what we like :^)
          </p>
        </div>
        <div className="contact-map-wrap">
          <ContactMap />
        </div>
      </section>

      <section className="contact-details" style={{ padding: "160px 80px 120px" }}>
        <div className="contact-details-grid">
          <div className="contact-col">
            <h2>Contact Us</h2>
            <p className="contact-col-note">Dig our vibe? We want to work with you.</p>
            <p className="contact-col-note">Contact us with your preferred mode of communication:</p>
          </div>

          <div className="contact-col">
            <div className="contact-block">
              <div className="contact-eyebrow">REACH US HERE:</div>
              <p className="contact-line">
                <span className="contact-icon" aria-hidden="true">✉</span>
                <a href="mailto:alan@liquid-lab.com">alan@liquid-lab.com</a>
              </p>
            </div>
            <div className="contact-block">
              <div className="contact-eyebrow">FACE-TO-FACE:</div>
              <p className="contact-line">24 Duxton Road,<br />(S)089488</p>
            </div>
          </div>

          <div className="contact-col">
            <div className="contact-block">
              <div className="contact-eyebrow">CAREER:</div>
              <p className="contact-line">
                We're always on the hunt for fresh meat to season.
              </p>
              <p className="contact-line">
                Aspiring to work at LLAB? Send your portfolio to
              </p>
              <p className="contact-line">
                <span className="contact-icon" aria-hidden="true">✉</span>
                <a href="mailto:alan@liquid-lab.com">alan@liquid-lab.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer mood={mood} onFlip={onFlip} onNav={onNav} />
    </div>);

}

window.ContactPage = ContactPage;