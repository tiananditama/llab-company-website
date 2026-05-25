// LiquidBlobs.jsx — floating liquid-glass blobs with collision + cursor repulsion.
// Portaled to <body> with position: fixed so blobs can roam the FULL
// viewport across every section as the user scrolls. (Earlier versions
// clipped them to the hero rect; that constraint is gone now.) Visually
// they sit above the navbar via a high z-index.
//
// Each blob is a div with backdrop-filter glass. Per-frame border-radius
// morph (8 handles, smooth elliptical interpolation between them) gives
// a fluid silhouette; slow rotation amplifies the asymmetry.
//
// Glass look: an SVG filter (#liquid-chromatic) feeds the backdrop
// through a radial displacement map (lens magnification) then splits
// R/G/B channels at slightly different scales (chromatic aberration),
// plus a CSS blur + saturate on top.
//
// Physics: position+velocity loop on rAF.
//  - Walls: viewport edges, reflect with damping
//  - Blob↔blob: positional correction + elastic impulse
//  - Wander: slowly-varying ambient drift
//  - Cursor repulsion: outward push within (radius + 120px). Pointer is
//    tracked at window level; overlay stays pointer-events:none so
//    clicks pass through to whatever is under the blob.
//
// Disabled below 900px viewport width (mobile gets nothing).
function LiquidBlobs({ count = 3, enabled = true }) {
  const wrapRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const mouseRef = React.useRef({ x: -9999, y: -9999, active: false });
  const [dispMapURL, setDispMapURL] = React.useState("");
  const [isDesktop, setIsDesktop] = React.useState(
    typeof window !== "undefined" ? window.innerWidth >= 900 : true
  );

  // Generate a radial displacement map once. Each pixel encodes a 2D
  // displacement vector pointing AWAY from the center in R (x) / G (y);
  // feDisplacementMap then samples the backdrop at the offset position,
  // which produces a lens-zoom / fish-eye magnification toward the rim.
  React.useEffect(() => {
    const SIZE = 256;
    const c = document.createElement("canvas");
    c.width = c.height = SIZE;
    const ctx = c.getContext("2d");
    const img = ctx.createImageData(SIZE, SIZE);
    const data = img.data;
    const cx = SIZE / 2, cy = SIZE / 2;
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;
        const r = Math.hypot(dx, dy);
        let profile = r < 1 ? Math.sin(r * Math.PI) : 0;
        profile = Math.pow(profile, 0.7);
        const dirX = r > 0.001 ? dx / r : 0;
        const dirY = r > 0.001 ? dy / r : 0;
        const i = (y * SIZE + x) * 4;
        data[i]     = 128 + dirX * profile * 127;
        data[i + 1] = 128 + dirY * profile * 127;
        data[i + 2] = 128;
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    setDispMapURL(c.toDataURL());
  }, []);

  // Desktop gate (re-check on resize)
  React.useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Window-level pointer tracking
  React.useEffect(() => {
    if (!enabled || !isDesktop) return;
    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => { mouseRef.current.active = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, isDesktop]);

  // Set up blobs + physics loop (viewport-bound, no section clipping)
  React.useEffect(() => {
    if (!enabled || !isDesktop) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const W0 = window.innerWidth;
    const H0 = window.innerHeight;

    // 8 ellipse handles, each driven by 2 layered sine waves for an
    // organic breathing morph.
    const makeShape = () => ({
      seeds: Array.from({ length: 8 }, () => Math.random() * Math.PI * 2),
    });

    const blobs = Array.from({ length: count }).map((_, i) => {
      const r = 90 + Math.random() * 110; // 90–200px
      return {
        x: r + Math.random() * Math.max(1, W0 - 2 * r),
        y: r + Math.random() * Math.max(1, H0 - 2 * r),
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        r,
        wanderAngle: Math.random() * Math.PI * 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        shape: makeShape(),
      };
    });

    wrap.innerHTML = "";
    blobs.forEach((b) => {
      const el = document.createElement("div");
      el.className = "liquid-blob";
      el.style.width = `${b.r * 2}px`;
      el.style.height = `${b.r * 2}px`;
      wrap.appendChild(el);
      b.el = el;
    });

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(32, now - last);
      last = now;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const mouse = mouseRef.current;

      for (const b of blobs) {
        // Wander
        b.wanderAngle += (Math.random() - 0.5) * 0.05;
        const targetMag = 0.45;
        const tx = Math.cos(b.wanderAngle) * targetMag;
        const ty = Math.sin(b.wanderAngle) * targetMag;
        b.vx += (tx - b.vx) * 0.01;
        b.vy += (ty - b.vy) * 0.01;

        // Cursor repulsion — mouse coords are already viewport-relative
        if (mouse.active) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const influence = b.r + 120;
          if (dist < influence) {
            const force = (1 - dist / influence) * 1.4;
            b.vx += (dx / dist) * force;
            b.vy += (dy / dist) * force;
          }
        }

        // Integrate + velocity cap
        const maxV = 4.0;
        const sp = Math.hypot(b.vx, b.vy);
        if (sp > maxV) { b.vx = (b.vx / sp) * maxV; b.vy = (b.vy / sp) * maxV; }
        b.x += b.vx * dt * 0.06;
        b.y += b.vy * dt * 0.06;

        // Viewport walls
        const damping = 0.92;
        if (b.x - b.r < 0)         { b.x = b.r;         b.vx = Math.abs(b.vx) * damping; }
        if (b.x + b.r > W)         { b.x = W - b.r;     b.vx = -Math.abs(b.vx) * damping; }
        if (b.y - b.r < 0)         { b.y = b.r;         b.vy = Math.abs(b.vy) * damping; }
        if (b.y + b.r > H)         { b.y = H - b.r;     b.vy = -Math.abs(b.vy) * damping; }
      }

      // Pairwise elastic collisions
      for (let i = 0; i < blobs.length; i++) {
        for (let j = i + 1; j < blobs.length; j++) {
          const a = blobs[i], c = blobs[j];
          const dx = c.x - a.x, dy = c.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const overlap = a.r + c.r - dist;
          if (overlap > 0) {
            const nx = dx / dist, ny = dy / dist;
            const ma = a.r * a.r, mc = c.r * c.r;
            const totalM = ma + mc;
            a.x -= nx * overlap * (mc / totalM);
            a.y -= ny * overlap * (mc / totalM);
            c.x += nx * overlap * (ma / totalM);
            c.y += ny * overlap * (ma / totalM);
            const dvx = c.vx - a.vx, dvy = c.vy - a.vy;
            const vn = dvx * nx + dvy * ny;
            if (vn < 0) {
              const restitution = 0.85;
              const impulse = (-(1 + restitution) * vn) / (1 / ma + 1 / mc);
              const ix = impulse * nx, iy = impulse * ny;
              a.vx -= ix / ma; a.vy -= iy / ma;
              c.vx += ix / mc; c.vy += iy / mc;
            }
          }
        }
      }

      // Apply transforms + 8-handle border-radius morph
      const AMP = 22;
      for (const b of blobs) {
        const s = b.shape;
        const t1 = now * 0.0009;
        const t2 = now * 0.0014;
        const v = (i) => 50 + (
          Math.sin(t1 + s.seeds[i]) * 0.65 +
          Math.sin(t2 + s.seeds[i] * 1.7) * 0.35
        ) * AMP;
        const r1 = v(0), r2 = v(1), r3 = v(2), r4 = v(3);
        const r5 = v(4), r6 = v(5), r7 = v(6), r8 = v(7);
        b.rotation += b.rotSpeed;
        b.el.style.borderRadius =
          `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
        b.el.style.transform =
          `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0) rotate(${b.rotation}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled, isDesktop, count]);

  if (!enabled || !isDesktop) return null;

  // Portal to <body> so we can sit above the navbar regardless of any
  // ancestor stacking context, and the layer covers the entire viewport.
  return ReactDOM.createPortal(
    <>
      <svg width="0" height="0" style={{position:"absolute"}} aria-hidden="true">
        <defs>
          <filter id="liquid-chromatic" x="-30%" y="-30%" width="160%" height="160%">
            <feImage xlinkHref={dispMapURL} href={dispMapURL} x="0" y="0" width="100%" height="100%" result="map" preserveAspectRatio="none" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="5" xChannelSelector="R" yChannelSelector="G" result="warpR" />
            <feColorMatrix in="warpR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feOffset in="r" dx="-5" dy="0" result="rOff" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="10" xChannelSelector="R" yChannelSelector="G" result="warpG" />
            <feColorMatrix in="warpG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="15" xChannelSelector="R" yChannelSelector="G" result="warpB" />
            <feColorMatrix in="warpB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feOffset in="b" dx="5" dy="0" result="bOff" />
            <feBlend in="rOff" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="bOff" mode="screen" />
          </filter>
        </defs>
      </svg>
      <div ref={wrapRef} className="liquid-blobs-wrap" aria-hidden="true"></div>
    </>,
    document.body
  );
}

window.LiquidBlobs = LiquidBlobs;
