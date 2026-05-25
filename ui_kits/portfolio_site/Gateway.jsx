// Gateway.jsx — the "HOW ARE YOU FEELING?" split-screen entry point
function Gateway({ onPick, onFlip, onNav, smallSize = 24, bigSize = 96 }) {
  // Periodically fire a brief glitch on "FEELING?" — type goes green and
  // displaces for ~600ms, then settles. Random interval so it doesn't
  // feel like a rhythm.
  const [glitching, setGlitching] = React.useState(false);
  React.useEffect(() => {
    let dismissTimer;
    const tick = () => {
      setGlitching(true);
      dismissTimer = setTimeout(() => setGlitching(false), 600);
      schedule();
    };
    let scheduleTimer;
    const schedule = () => {
      // 3–7s between glitches
      const wait = 3000 + Math.random() * 4000;
      scheduleTimer = setTimeout(tick, wait);
    };
    schedule();
    return () => { clearTimeout(scheduleTimer); clearTimeout(dismissTimer); };
  }, []);

  return (
    <div className="gateway">
      <div className="gateway-nav">
        <Navbar mood="brave" onFlip={onFlip} onLogo={() => {}} onNav={onNav} hideFlip={true} />
      </div>
      <div className="gateway-half left">
        <video
          className="gateway-video"
          src="../../assets/brave.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="gateway-half-tint"></div>
        <div className="gateway-cta left">
          <Button variant="outline" onClick={() => onPick("brave")}>Brave</Button>
        </div>
      </div>
      <div className="gateway-half right">
        <video
          className="gateway-video"
          src="../../assets/experimental-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="gateway-half-tint"></div>
        <div className="gateway-cta right">
          <Button variant="outline" onClick={() => onPick("experimental")}>Experimental</Button>
        </div>
      </div>
      <div className={`gateway-title ${glitching ? "is-glitching" : ""}`}>
        <span
          className="small"
          data-text="HOW ARE YOU"
          style={{ fontSize: smallSize, padding: `${Math.round(smallSize * 0.33)}px ${Math.round(smallSize * 0.75)}px` }}
        >HOW ARE YOU</span>
        <br />
        <span
          className="big"
          data-text="FEELING?"
          style={{ fontSize: bigSize, padding: `${Math.round(bigSize * 0.10)}px ${Math.round(bigSize * 0.25)}px ${Math.round(bigSize * 0.15)}px`, marginTop: `-${Math.round(bigSize * 0.04)}px` }}
        >FEELING?</span>
      </div>
    </div>
  );
}

window.Gateway = Gateway;
