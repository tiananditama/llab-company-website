// ExperimentalParticles.jsx
// Metaball disintegration ("EXPERIMENTAL" headline) using the reference
// technique from uploads/letter-disintegrate.html: PixiJS soft-blob
// particles → BlurFilter → alpha-threshold shader.
//
// Why 4× super-sampling
// ─────────────────────
// At a 72px display height, the metaball blur radius (a few px) is
// comparable to the inter-letter gap, so neighbouring letters fuse into
// an unreadable blob. The reference doesn't have this problem because
// its letter fills the screen (≈420px tall) — strokes and gaps are
// huge relative to the blur kernel.
//
// So we render internally at 4× (font 288px, canvas ~2800×480) where
// the reference's physics/blur values work properly, then CSS-scale the
// canvas down to the 72px display size. Mouse coords are remapped
// 1× → 4× before being fed to the simulation.

function ExperimentalParticles({
  text = "EXPERIMENTAL",
  fontPx = 72,
  mood = "brave",
}) {
  const wrapRef  = React.useRef(null);
  const mouseRef = React.useRef({ x: -9999, y: -9999 });
  const [ready, setReady] = React.useState(false);

  // Wait for Rubik so the sampled silhouette uses the real font metrics.
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (document.fonts && document.fonts.load) {
          await document.fonts.load(`700 ${fontPx}px "Rubik"`);
          await document.fonts.ready;
        }
      } catch (e) {}
      if (!cancelled) setReady(true);
    })();
    return () => { cancelled = true; };
  }, [fontPx]);

  React.useEffect(() => {
    if (!ready || !window.PIXI) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Super-sampling factor: render the whole metaball pipeline at this
    // scale, then display 1/SS the size via CSS. ≥4 keeps letter gaps
    // wider than the blur kernel so glyphs stay legibly separated.
    const SS = 4;

    // ── Display sizes ──────────────────────────────────────────────────
    const DISPLAY_FONT_PX = fontPx;
    const FONT_WT  = 700;
    const FONT_FAM = '"Rubik", "Helvetica Neue", Arial, sans-serif';
    const LETTER_SP_DISPLAY = -0.02 * DISPLAY_FONT_PX;
    const DISPLAY_PAD_X = Math.round(DISPLAY_FONT_PX * 0.83);
    const DISPLAY_PAD_Y = Math.round(DISPLAY_FONT_PX * 0.42);

    // ── Internal (super-sampled) sizes ─────────────────────────────────
    const FONT_PX   = DISPLAY_FONT_PX * SS;
    const LETTER_SP = LETTER_SP_DISPLAY * SS;
    const PAD_X     = DISPLAY_PAD_X * SS;
    const PAD_Y     = DISPLAY_PAD_Y * SS;

    // Tunables in internal (SS=4) pixels. Sprite scale + sample gap
    // shrunk vs the reference so the metaball strokes are thinner and
    // letterforms read more accurately at this small text scale.
    const FRICTION     = 0.86;
    const MOVE_SPEED   = 0.12;
    const HOVER_RADIUS = 110 * SS;
    const BLAST_FORCE  = 12  * SS;
    const SAMPLE_GAP   = 4;       // px in internal space (≈1px display)
    const BLUR         = 6;       // px in internal space — smaller so edges stay sharp
    const THRESHOLD    = 0.50;
    const SPRITE_SCALE = 0.13;    // smaller droplets → cleaner letter strokes

    const TEXT = text;

    // Threshold shader paints every solid pixel this tint.
    const BLOB_COLOR = mood === "experimental" ? 0x29261B : 0xF4F4EF;
    const mr = ((BLOB_COLOR >> 16) & 0xff) / 255;
    const mg = ((BLOB_COLOR >>  8) & 0xff) / 255;
    const mb = ( BLOB_COLOR        & 0xff) / 255;

    // ── Measure ────────────────────────────────────────────────────────
    const meas = document.createElement('canvas').getContext('2d');
    meas.font = `${FONT_WT} ${FONT_PX}px ${FONT_FAM}`;
    try { meas.letterSpacing = `${LETTER_SP}px`; } catch (e) {}
    const textW = meas.measureText(TEXT).width + LETTER_SP * (TEXT.length - 1);
    const W = Math.ceil(textW) + PAD_X * 2;          // internal width
    const H = Math.ceil(FONT_PX * 1.25) + PAD_Y * 2; // internal height
    const W_DISP = W / SS;
    const H_DISP = H / SS;

    // ── Sample glyph alpha into home positions ─────────────────────────
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const octx = off.getContext('2d');
    octx.fillStyle = '#fff';
    octx.font = `${FONT_WT} ${FONT_PX}px ${FONT_FAM}`;
    try { octx.letterSpacing = `${LETTER_SP}px`; } catch (e) {}
    octx.textBaseline = 'middle';
    octx.fillText(TEXT, PAD_X, H / 2);
    const data = octx.getImageData(0, 0, W, H).data;

    const points = [];
    for (let y = 0; y < H; y += SAMPLE_GAP) {
      for (let x = 0; x < W; x += SAMPLE_GAP) {
        if (data[(y * W + x) * 4 + 3] > 128) {
          points.push({
            x: x + (Math.random() - 0.5) * SAMPLE_GAP,
            y: y + (Math.random() - 0.5) * SAMPLE_GAP,
          });
        }
      }
    }
    if (points.length === 0) return;

    // ── PixiJS app at internal resolution ──────────────────────────────
    const app = new PIXI.Application({
      width: W,
      height: H,
      backgroundAlpha: 0,
      antialias: true,
      resolution: 1,
      autoDensity: false,
    });
    // CSS-scale the canvas down to the intended display size. The browser
    // downsamples the 4× bitmap, giving us an effectively super-sampled
    // metaball at the final pixel size.
    app.view.style.width  = W_DISP + 'px';
    app.view.style.height = H_DISP + 'px';
    app.view.style.display = 'block';
    wrap.appendChild(app.view);

    // ── Soft blob texture ──────────────────────────────────────────────
    const TEX_SIZE = 128;
    const tcv = document.createElement('canvas');
    tcv.width = tcv.height = TEX_SIZE;
    const tctx = tcv.getContext('2d');
    const grad = tctx.createRadialGradient(
      TEX_SIZE / 2, TEX_SIZE / 2, 0,
      TEX_SIZE / 2, TEX_SIZE / 2, TEX_SIZE / 2
    );
    grad.addColorStop(0,   'rgba(255,255,255,1)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1,   'rgba(255,255,255,0)');
    tctx.fillStyle = grad;
    tctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);
    const texture = PIXI.Texture.from(tcv);

    const container = new PIXI.ParticleContainer(points.length, {
      vertices: false, position: true, rotation: false,
      scale: false, uvs: false, tint: false,
    });
    app.stage.addChild(container);

    const particles = points.map((p) => {
      const sp = new PIXI.Sprite(texture);
      sp.anchor.set(0.5);
      sp.scale.set(SPRITE_SCALE);
      sp.x = p.x; sp.y = p.y;
      container.addChild(sp);
      return {
        sp,
        savedX: p.x, savedY: p.y,
        x: p.x, y: p.y,
        vx: 0, vy: 0,
      };
    });

    // ── Metaball filters ───────────────────────────────────────────────
    const BlurFilterCls =
      (PIXI.filters && PIXI.filters.BlurFilter) || PIXI.BlurFilter;
    const blurFilter = new BlurFilterCls();
    blurFilter.blur    = BLUR;
    blurFilter.autoFit = true;
    blurFilter.quality = 4;

    const fragSource = [
      'precision mediump float;',
      'varying vec2 vTextureCoord;',
      'uniform sampler2D uSampler;',
      'uniform float threshold;',
      'uniform float mr; uniform float mg; uniform float mb;',
      'void main(void) {',
      '  vec4 color = texture2D(uSampler, vTextureCoord);',
      '  if (color.a > threshold) {',
      '    gl_FragColor = vec4(mr, mg, mb, 1.0);',
      '  } else {',
      '    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);',
      '  }',
      '}'
    ].join('\n');
    const thresholdFilter = new PIXI.Filter(null, fragSource, {
      threshold: THRESHOLD, mr, mg, mb,
    });
    app.stage.filters    = [blurFilter, thresholdFilter];
    app.stage.filterArea = app.renderer.screen;

    // ── Animation (reference physics, in internal pixels) ──────────────
    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const r2 = HOVER_RADIUS * HOVER_RADIUS;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.vx += (p.savedX - p.x) * MOVE_SPEED;
        p.vy += (p.savedY - p.y) * MOVE_SPEED;
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 0.0001;
          const f = (HOVER_RADIUS - d) / HOVER_RADIUS;
          p.vx += (dx / d) * f * BLAST_FORCE;
          p.vy += (dy / d) * f * BLAST_FORCE;
        }
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x  += p.vx;
        p.y  += p.vy;
        p.sp.x = p.x;
        p.sp.y = p.y;
      }
    };
    app.ticker.add(tick);

    // ── Pointer (remap CSS pixels → internal pixels) ───────────────────
    const view = app.view;
    const onMove = (e) => {
      const r = view.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - r.left) * (W / r.width);
      mouseRef.current.y = (e.clientY - r.top)  * (H / r.height);
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerleave', onLeave);
    view.addEventListener('pointercancel', onLeave);

    return () => {
      view.removeEventListener('pointermove', onMove);
      view.removeEventListener('pointerleave', onLeave);
      view.removeEventListener('pointercancel', onLeave);
      try { app.destroy(true, { children: true, texture: true, baseTexture: true }); } catch (e) {}
    };
  }, [ready, mood, text, fontPx]);

  return (
    <span
      ref={wrapRef}
      className="exp-particles"
      role="img"
      aria-label={text}
      style={{
        // Match the negative-margin compensation to PAD_*, which scale
        // with fontPx. Keeps the visible word aligned with surrounding
        // copy at any size.
        marginLeft:   `-${Math.round(fontPx * 0.83)}px`,
        marginTop:    `-${Math.round(fontPx * 0.42)}px`,
        marginBottom: `-${Math.round(fontPx * 0.42)}px`,
      }}
    >
      <span className="exp-particles-sr">{text}</span>
    </span>
  );
}

window.ExperimentalParticles = ExperimentalParticles;
