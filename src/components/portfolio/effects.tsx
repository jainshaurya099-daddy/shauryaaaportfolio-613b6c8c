import { useEffect, useRef, type ReactNode, type ElementType, type CSSProperties } from 'react';

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fades/slides children in once they enter the viewport. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: { children: ReactNode; as?: ElementType; delay?: number; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('in'); return; }
    el.classList.add('pre');
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` } as CSSProperties}>{children}</Tag>;
}

/** Gentle magnetic pull toward the pointer (desktop, fine pointers only). */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el || !finePointer()) return;
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`; };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, [strength]);
  return ref;
}

/** Pointer spotlight + subtle tilt for cards. Writes CSS vars --mx/--my. */
export function useSpotlight<T extends HTMLElement>(tilt = 4) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el || !finePointer()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${x * 100}%`); el.style.setProperty('--my', `${y * 100}%`);
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * tilt}deg) rotateY(${(x - 0.5) * tilt}deg)`;
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, [tilt]);
  return ref;
}

export function SectionHead({ label, lines, accent }: { label: string; lines: string[]; accent?: number }) {
  return <div className="section-head">
    <Reveal><p className="eyebrow">{label}</p></Reveal>
    <h2 className="display-2">{lines.map((l, i) => <Reveal as="span" key={l} delay={80 + i * 90} className="line"><span className={i === accent ? 'grad serif' : undefined}>{l}</span></Reveal>)}</h2>
  </div>;
}
