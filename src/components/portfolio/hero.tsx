import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { profile, roles } from '@/data/portfolio';
import { useMagnetic } from './effects';

function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext('2d'); if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0; const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let pts: { x: number; y: number; vx: number; vy: number }[] = [];
    const resize = () => {
      w = c.offsetWidth; h = c.offsetHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 }));
    };
    const css = getComputedStyle(document.documentElement);
    const violet = css.getPropertyValue('--violet-rgb').trim() || '160,120,255';
    const cyan = css.getPropertyValue('--cyan-rgb').trim() || '90,220,240';
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        ctx.fillStyle = `rgba(${dm < 140 ? cyan : violet},${dm < 140 ? 0.9 : 0.45})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i]!, b = pts[j]!; const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) { ctx.strokeStyle = `rgba(${violet},${(1 - d / 110) * 0.16})`; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const onMove = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    resize(); draw();
    window.addEventListener('resize', resize); window.addEventListener('pointermove', onMove);
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) raf = requestAnimationFrame(draw); };
    document.addEventListener('visibilitychange', vis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', vis); };
  }, []);
  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}

function AICore() {
  const meridians = [0, 30, 60, 90, 120, 150];
  return <div className="core" aria-hidden="true">
    <div className="core-glow" />
    <svg viewBox="-110 -110 220 220" className="core-svg">
      <defs>
        <linearGradient id="cg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="var(--violet)" /><stop offset="1" stopColor="var(--cyan)" /></linearGradient>
        <radialGradient id="cr"><stop offset="0" stopColor="var(--cyan)" stopOpacity=".9" /><stop offset=".45" stopColor="var(--violet)" stopOpacity=".35" /><stop offset="1" stopColor="var(--violet)" stopOpacity="0" /></radialGradient>
      </defs>
      <g className="spin-slow">{meridians.map(a => <ellipse key={a} rx="92" ry="34" fill="none" stroke="url(#cg)" strokeOpacity=".35" strokeWidth=".6" transform={`rotate(${a})`} />)}</g>
      <g className="spin-rev">{[0, 1, 2, 3].map(i => <circle key={i} r={30 + i * 18} fill="none" stroke="var(--cyan)" strokeOpacity={0.12 + i * 0.04} strokeDasharray={`${2 + i} ${6 + i * 2}`} strokeWidth=".7" />)}</g>
      <circle r="44" fill="url(#cr)" className="pulse" />
      <circle r="9" fill="var(--foreground)" opacity=".9" />
      <g className="spin-slow">{[0, 72, 144, 216, 288].map(a => <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 92} cy={Math.sin((a * Math.PI) / 180) * 34} r="2.2" fill="var(--cyan)" />)}</g>
    </svg>
  </div>;
}

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % roles.length), 2600); return () => clearInterval(t); }, []);
  return <p className="role" aria-live="polite"><span className="role-dash" aria-hidden="true" /><span key={i} className="role-text">{roles[i] ?? roles[0]}</span></p>;
}

const bootLines = ['initializing creativity...', 'loading new ideas...', 'status: always learning'];
function BootPanel() {
  const [text, setText] = useState<string[]>(['']);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setText(bootLines); return; }
    let line = 0, ch = 0; let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (line >= bootLines.length) return;
      ch++; setText(prev => { const n = [...prev]; n[line] = (bootLines[line] ?? '').slice(0, ch); return n; });
      if (ch >= (bootLines[line] ?? '').length) { line++; ch = 0; if (line < bootLines.length) setText(p => [...p, '']); t = setTimeout(tick, 420); }
      else t = setTimeout(tick, 38);
    };
    t = setTimeout(tick, 700); return () => clearTimeout(t);
  }, []);
  return <div className="boot glass" aria-label={bootLines.join(', ')}>
    <div className="boot-bar"><i /><i /><i /><span>sj@core ~</span></div>
    <div aria-hidden="true">{text.map((l, i) => <p key={i}><span className="prompt">›</span> {l}{i === text.length - 1 && <span className="caret">_</span>}</p>)}</div>
  </div>;
}

export function Hero() {
  const a = useMagnetic<HTMLAnchorElement>(); const b = useMagnetic<HTMLAnchorElement>();
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <ParticleField />
    <div className="hero-aura" aria-hidden="true" />
    <div className="hero-grid page">
      <div className="hero-copy">
        <p className="pill"><span className="dot" />BUILDING MY FUTURE IN TECH</p>
        <h1 id="hero-title" className="display-1">
          <span className="line l1">Curious <span className="grad serif">Mind.</span></span>
          <span className="line l2"><span className="grad serif">Infinite</span> Possibilities.</span>
        </h1>
        <p className="hero-lede">I'm {profile.name} — a computer science student exploring AI, machine learning, and the art of building things that matter.</p>
        <RotatingRole />
        <div className="hero-cta">
          <a ref={a} href="#projects" className="btn btn-primary">EXPLORE MY UNIVERSE <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a ref={b} href="#contact" className="btn btn-ghost">LET'S CONNECT</a>
        </div>
      </div>
      <div className="hero-art"><AICore /><BootPanel /></div>
    </div>
    <a href="#about" className="scroll-cue" aria-label="Scroll to About section"><span>SCROLL</span><ArrowDown size={14} aria-hidden="true" /></a>
  </section>;
}
