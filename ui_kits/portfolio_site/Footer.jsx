// Footer.jsx — common to both moods, recoloured
function Footer({ mood, onFlip, onNav }) {
  return (
    <footer className={`footer ${mood}`}>
      <div className="footer-mark">
        <img src="../../assets/llab-sign-white.png" alt="LLAB" className="footer-mark-img" />
      </div>
      <div>
        <h4>Connect</h4>
        <ul>
          <li><a href="mailto:alan@liquid-lab.com">alan@liquid-lab.com</a></li>
          <li><a href="https://www.instagram.com/wearellab/" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="https://www.linkedin.com/company/liquidlab-comms/?originalSubdomain=sg" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>
      <div>
        <h4>Visit</h4>
        <ul>
          <li><a href="https://maps.google.com/?q=24+Duxton+Road+Singapore+089488" target="_blank" rel="noopener">24 Duxton Road,<br/>(S)089488<br/>Singapore</a></li>
        </ul>
      </div>
      <div>
        <h4>Index</h4>
        <ul>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onNav?.("projects"); }}>Projects</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onNav?.("approach"); }}>Approach</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onNav?.("contact"); }}>Contact</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); onFlip?.(); }}>Flip mood ⇋</a></li>
        </ul>
      </div>
      <div className="legal">
        <span>© LLAB 2025 · Singapore.</span>
        <span>Built for the brave and the experimental.</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
