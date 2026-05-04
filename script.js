/* Manity HERMES — starfield + small interactions */

(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  let w = 0;
  let h = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const STAR_COUNT_TARGET_DENSITY = 0.00012; // stars per pixel

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initStars();
  }

  function initStars() {
    const count = Math.max(60, Math.floor(w * h * STAR_COUNT_TARGET_DENSITY));
    stars = new Array(count).fill(0).map(() => {
      const layer = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: layer * 1.4 + 0.2,
        baseAlpha: layer * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.01,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02
      };
    });
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.twinkle += s.twinkleSpeed;
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;

      const a = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 230, 255, ${a})`;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  resize();
  requestAnimationFrame(frame);
  window.addEventListener('resize', resize, { passive: true });

  // Smooth-scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
