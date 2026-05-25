// Approach.jsx — three-pillar manifesto section
// COMBINE / APPEAL / AIM as a 3-column row; imagery as a banner above;
// underlined closer lines below.

function ApproachItem({ label, children }) {
  return (
    <div className="approach-item">
      <div className="approach-eyebrow">{label}</div>
      <p className="approach-body">{children}</p>
    </div>
  );
}

function Approach() {
  return (
    <section className="approach">
      <div className="approach-columns">
        <ApproachItem label="COMBINE">
          Well-grounded product marketing strategy into bite-sized morsels of
          tasty allegory, filled with timeless, humanistic attributes.
        </ApproachItem>
        <ApproachItem label="APPEAL">
          Local and regional markets; but also the new-age hybrid shoppers who
          flit between online and brick-and-mortar.
        </ApproachItem>
        <ApproachItem label="AIM">
          The nerds, the cheerleaders, the freaks and geeks. Also, the zoomers,
          the boomers and the quiet ones in-between.
        </ApproachItem>
      </div>

      <div className="approach-rule" aria-hidden="true"></div>

      <div className="approach-closer">
        <p>
          Making good work that <span className="hl">lasts</span> means being <u>BRAVE</u>.
        </p>
        <p>
          Making good work that <span className="hl">stays impactful</span> means being <u>EXPERIMENTAL</u>.
        </p>
      </div>
    </section>
  );
}

window.Approach = Approach;
