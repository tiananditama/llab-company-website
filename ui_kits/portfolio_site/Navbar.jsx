// Button.jsx — pill buttons in three flavours
function Button({ variant = "green", children, onClick, style }) {
  const cls =
    variant === "outline" ? "btn btn--outline" :
    variant === "outline-light" ? "btn btn--outline-light" :
    "btn btn--green";
  return (
    <button className={cls} onClick={onClick} style={style}>{children}</button>
  );
}

// Navbar.jsx — adapts to mood, holds the flip toggle + routing.
// Tracks scroll so the glass treatment only kicks in past the top.
// Below 900px the inline links collapse into a hamburger that opens a
// fullscreen overlay menu (responsive.css handles the breakpoint).
function Navbar({ mood, onFlip, onLogo, onNav, active, hideFlip }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Lock body scroll when the mobile menu is open
  React.useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  const isExp = mood === "experimental";
  const iconSrc = isExp ? "../../assets/icon-flip-dark.svg" : "../../assets/icon-flip-light.svg";
  const handleNav = (key) => {
    setMenuOpen(false);
    onNav && onNav(key);
  };
  const handleFlip = () => {
    setMenuOpen(false);
    onFlip && onFlip();
  };
  const link = (key, label) => (
    <a
      className={`nav-link ${active === key ? "is-active" : "is-muted"}`}
      onClick={() => handleNav(key)}
    >{label}</a>
  );
  const overlayLink = (key, label) => (
    <a
      className={active === key ? "is-active" : ""}
      onClick={() => handleNav(key)}
    >{label}</a>
  );
  return (
    <>
      <nav className={`navbar ${mood} ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-logo" onClick={onLogo} role="button" aria-label="LLAB home">
          <img src="../../assets/llab-sign-white.png" alt="LLAB" />
        </div>
        <button
          className={`nav-hamburger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
        </button>
        <div className="nav-links">
          {link("projects", "PROJECTS")}
          <span className="nav-rule" aria-hidden="true"></span>
          {link("approach", "APPROACH")}
          <span className="nav-rule" aria-hidden="true"></span>
          {link("contact", "CONTACT")}
          {!hideFlip && <span className="nav-rule" aria-hidden="true"></span>}
          {!hideFlip && (
            <button className="flip-btn" onClick={onFlip} aria-label={`Switch to ${isExp ? "Brave" : "Experimental"} mood`}>
              <img src={iconSrc} alt="" />
              <span className="flip-tip">Mood change?</span>
            </button>
          )}
        </div>
      </nav>
      <div className={`nav-overlay ${mood} ${menuOpen ? "is-open" : ""}`}>
        {overlayLink("projects", "PROJECTS")}
        {overlayLink("approach", "APPROACH")}
        {overlayLink("contact", "CONTACT")}
        {!hideFlip && (
          <button className="flip-row" onClick={handleFlip} aria-label={`Switch to ${isExp ? "Brave" : "Experimental"} mood`}>
            <img src={iconSrc} alt="" />
            <span>Mood change?</span>
          </button>
        )}
      </div>
    </>
  );
}

window.Button = Button;
window.Navbar = Navbar;
