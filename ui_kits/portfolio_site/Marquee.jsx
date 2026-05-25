// Marquee.jsx — endless horizontal scroller above the projects grid.
// Two variants:
//   "default" (Brave) — full-width green stripe with ink borders
//   "glass"   (Experimental) — floating rounded liquid-glass card

function Marquee({ items = ["BRAVE", "EXPERIMENTAL", "CAMPAIGN", "EXPERIENCE"], variant = "default" }) {
  const track = (
    <div className="marquee-track">
      {items.map((w, i) => (
        <React.Fragment key={i}>
          <span className="marquee-word">{w}</span>
          <span className="marquee-sep" aria-hidden="true">✦</span>
        </React.Fragment>
      ))}
    </div>
  );

  // Glass variant sits in a translucent wrapper so the page paper-color
  // shows through and the backdrop-filter has something to refract.
  if (variant === "glass") {
    return (
      <div className="marquee-glass-wrap">
        <div className="marquee-glass-aura" aria-hidden="true"></div>
        <div className="marquee marquee--glass" aria-label={items.join(" · ")}>
          <div className="marquee-row">
            {track}
            {track}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="marquee" aria-label={items.join(" · ")}>
      <div className="marquee-row">
        {track}
        {track}
      </div>
    </div>
  );
}

window.Marquee = Marquee;
