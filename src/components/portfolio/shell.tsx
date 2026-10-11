import { useEffect, useRef, useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUp, Menu, X } from 'lucide-react';
import { profile } from '@/data/portfolio';

const links = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['journey', 'Journey'], ['contact', 'Contact']] as const;

export function Monogram({ size = 34 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="mono">
    <defs><linearGradient id="mg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="var(--violet)" /><stop offset="1" stopColor="var(--cyan)" /></linearGradient></defs>
    <path d="M20 1.5 L37 11 V29 L20 38.5 L3 29 V11 Z" fill="none" stroke="url(#mg)" strokeWidth="1.2" />
    <text x="20" y="25" textAnchor="middle" className="mono-t">SJ</text>
  </svg>;
}

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });
  const home = pathname === '/';
  const nav = useRef<HTMLElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0 });
  useEffect(() => {
    const onScroll = () => { const h = document.documentElement; setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)); setScrolled(h.scrollTop > 40); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
    if (!home) { const m = links.find(([id]) => pathname.startsWith('/' + id)); setActive(m ? m[0] : ''); return; }
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [home, pathname]);
  useEffect(() => {
    const el = nav.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    setInd(el ? { x: el.offsetLeft, w: el.offsetWidth } : { x: 0, w: 0 });
  }, [active]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const href = (id: string) => (id === 'home' ? '/' : `/#${id}`);
  return <>
    <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    <header className={`nav-wrap ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav glass">
        <Link to="/" className="brand" aria-label={`${profile.name} — home`}><Monogram /><span className="brand-t">Shaurya<span className="grad">.</span></span></Link>
        <nav ref={nav} className="nav-links" aria-label="Main">
          <span className="nav-ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, opacity: ind.w ? 1 : 0 }} aria-hidden="true" />
          {links.map(([id, label]) => <a key={id} data-id={id} href={href(id)} aria-current={active === id ? 'true' : undefined}>{label}</a>)}
        </nav>
        <button className="menu-btn" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
    <div id="mobile-menu" className={`mmenu ${open ? 'open' : ''}`} hidden={!open}>
      <nav aria-label="Mobile">{links.map(([id, label], i) => <a key={id} href={href(id)} onClick={() => setOpen(false)} style={{ transitionDelay: `${60 + i * 50}ms` }} aria-current={active === id ? 'true' : undefined}><span>0{i}</span>{label}</a>)}</nav>
      <p>{profile.email}</p>
    </div>
  </>;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 900); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  return <button className={`totop glass ${show ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" tabIndex={show ? 0 : -1}><ArrowUp size={18} /></button>;
}

export function PortfolioFooter() {
  return <footer className="footer page">
    <div className="footer-row"><Monogram size={28} /><p>{profile.name} · {profile.shortBranch} · {profile.college}</p><p className="serif footer-tag">Curious mind. Infinite possibilities.</p></div>
    <p className="footer-small">© {new Date().getFullYear()} {profile.name}. Built while learning.</p>
  </footer>;
}
