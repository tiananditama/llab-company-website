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
function Navbar({ mood, onFlip, onLogo, onNav, active, hideFlip }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isExp = mood === "experimental";
  const iconSrc = isExp ? "../../assets/icon-flip-dark.svg" : "../../assets/icon-flip-light.svg";
  const link = (key, label) => (
    <a
      className={`nav-link ${active === key ? "is-active" : "is-muted"}`}
      onClick={() => onNav && onNav(key)}
    >{label}</a>
  );
  return (
    <nav className={`navbar ${mood} ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-logo" onClick={onLogo} role="button" aria-label="LLAB home">
        <img src="../../assets/llab-sign-white.png" alt="LLAB" />
      </div>
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
  );
}

window.Button = Button;
window.Navbar = Navbar;
