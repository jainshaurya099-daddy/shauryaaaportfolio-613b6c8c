import { useState, type FormEvent } from 'react';
import { Terminal, Code2, Puzzle, FileCode2, Palette, Braces, Brain, Network, Flag, Hammer, Rocket, GraduationCap, Github, ExternalLink, Mail, Linkedin, Copy, Check, Send, Lock, Sparkles } from 'lucide-react';
import { profile, profilePanel, skillGroups, projects, journey, type ProjectStatus } from '@/data/portfolio';
import { Reveal, SectionHead, useSpotlight } from './effects';

const skillIcons = { terminal: Terminal, python: Code2, puzzle: Puzzle, html: FileCode2, css: Palette, js: Braces, brain: Brain, network: Network } as const;
const journeyIcons = { flag: Flag, code: Code2, hammer: Hammer, rocket: Rocket } as const;

/* ─── 01 ABOUT ─────────────────────────────────────────── */
function Avatar() {
  if (profile.photo) return <img src={profile.photo} alt={`Portrait of ${profile.name}`} className="avatar-photo" loading="lazy" />;
  return <svg viewBox="0 0 240 300" className="avatar-svg" role="img" aria-label="Abstract developer avatar">
    <defs><linearGradient id="av" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="var(--violet)" /><stop offset="1" stopColor="var(--cyan)" /></linearGradient></defs>
    {Array.from({ length: 13 }, (_, i) => <line key={i} x1="0" x2="240" y1={i * 25} y2={i * 25} stroke="var(--line)" />)}
    <circle cx="120" cy="105" r="48" fill="none" stroke="url(#av)" strokeWidth="1.5" />
    <circle cx="120" cy="105" r="30" fill="url(#av)" opacity=".18" />
    <path d="M40 300 C40 210 80 180 120 180 C160 180 200 210 200 300" fill="none" stroke="url(#av)" strokeWidth="1.5" />
    <g fill="var(--cyan)">{[[98, 98], [142, 98], [120, 122], [70, 240], [170, 240], [120, 215]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.5" />)}</g>
    <path d="M98 98 L120 122 L142 98 M70 240 L120 215 L170 240" fill="none" stroke="var(--cyan)" strokeOpacity=".5" />
    <text x="120" y="290" textAnchor="middle" className="avatar-tag">SJ · v1.0 · in progress</text>
  </svg>;
}

export function AboutSection() {
  return <section id="about" className="section page" aria-labelledby="about-h">
    <div className="about-grid">
      <div>
        <div id="about-h"><SectionHead label="01 / THE HUMAN BEHIND THE CODE" lines={['Not an expert yet.', 'Just getting started.', "And that's the exciting part."]} accent={2} /></div>
        <Reveal delay={150}><p className="lede">{profile.introduction}</p></Reveal>
        <Reveal delay={220}>
          <dl className="panel glass">
            <div className="panel-top"><span className="dot" /> profile.status — live</div>
            {profilePanel.map(r => <div key={r.k} className="panel-row"><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
          </dl>
        </Reveal>
      </div>
      <Reveal delay={200} className="avatar-wrap"><div className="avatar glass"><Avatar /></div><span className="avatar-chip glass">{profile.stage} · {profile.shortBranch}</span></Reveal>
    </div>
    <Reveal><p className="quote serif" aria-label="Every expert was once a beginner.">{'Every expert was once a beginner.'.split(' ').map((w, i) => <span key={i} style={{ animationDelay: `${i * 0.12}s` }}>{w} </span>)}</p></Reveal>
  </section>;
}

/* ─── 02 SKILLS ────────────────────────────────────────── */
function SkillTile({ s, i }: { s: (typeof skillGroups)[number]['skills'][number]; i: number }) {
  const Icon = skillIcons[s.icon as keyof typeof skillIcons];
  const ref = useSpotlight<HTMLDivElement>(6);
  return <Reveal delay={i * 60}><div ref={ref} className={`tile spot ${s.level === 'Exploring' ? 'tile-explore' : ''}`} tabIndex={0}>
    <div className="tile-top"><span className="tile-icon"><Icon size={20} aria-hidden="true" /></span><span className={`level lv-${s.level.toLowerCase()}`}>{s.level}</span></div>
    <h4>{s.name}</h4><p>{s.text}</p>
    <p className="tile-detail"><span>Learning now →</span> {s.detail}</p>
  </div></Reveal>;
}

export function SkillsSection() {
  return <section id="skills" className="section page" aria-labelledby="skills-h">
    <div id="skills-h"><SectionHead label="02 / MY TOOLKIT" lines={["Tools I'm learning.", "Ideas I'm exploring."]} accent={1} /></div>
    <Reveal><p className="legend"><span className="level lv-practicing">Practicing</span> regular hands-on practice <span className="level lv-beginner">Beginner</span> early fundamentals <span className="level lv-exploring">Exploring</span> reading & curiosity, not yet hands-on</p></Reveal>
    {skillGroups.map(g => <div key={g.group} className="skill-group">
      <Reveal><h3 className="group-h"><span>{g.group}</span><i /></h3></Reveal>
      <div className="tiles">{g.skills.map((s, i) => <SkillTile key={s.name} s={s} i={i} />)}</div>
    </div>)}
  </section>;
}

/* ─── 03 PROJECTS ──────────────────────────────────────── */
function Mock({ kind }: { kind: 'browser' | 'code' | 'neural' }) {
  if (kind === 'browser') return <div className="mock mock-browser" aria-hidden="true"><div className="mb-bar"><i /><i /><i /><span>shaurya.dev</span></div><div className="mb-body"><b className="grad serif">Curious Mind.</b><span /><span /><span className="short" /><div className="mb-orb" /></div></div>;
  if (kind === 'code') return <pre className="mock mock-code" aria-hidden="true"><code>{`#include <stdio.h>

int main() {
  int n = 5;
  for (int i = 1; i <= n; i++)
    printf("step %d\\n", i);
  return 0; // keep going
}`}</code></pre>;
  return <svg className="mock mock-neural" viewBox="0 0 300 180" aria-hidden="true">
    {[[40, [40, 90, 140]], [150, [25, 70, 115, 160]], [260, [65, 115]]].flatMap(([x, ys], li, arr) => (ys as number[]).flatMap(y => li < arr.length - 1 ? (arr[li + 1]![1] as number[]).map(y2 => <line key={`${x}${y}${y2}`} x1={x as number} y1={y} x2={arr[li + 1]![0] as number} y2={y2} stroke="var(--violet)" strokeOpacity=".3" />) : []))}
    {[[40, [40, 90, 140]], [150, [25, 70, 115, 160]], [260, [65, 115]]].flatMap(([x, ys]) => (ys as number[]).map(y => <circle key={`c${x}${y}`} cx={x as number} cy={y} r="7" fill="var(--bg-2)" stroke="var(--cyan)" className="node" />))}
  </svg>;
}

const statusClass: Record<ProjectStatus, string> = { 'In Progress': 'st-progress', Learning: 'st-learning', Planned: 'st-planned' };

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useSpotlight<HTMLElement>(3);
  return <Reveal delay={i * 80} className={`pc-wrap pc-${i}`}><article ref={ref} className="pcard spot" aria-labelledby={`p-${p.id}`}>
    <div className="pc-visual"><Mock kind={p.visual} /></div>
    <div className="pc-body">
      <div className="pc-meta"><span className="pc-num">PROJECT {p.id}</span><span className={`status ${statusClass[p.status]}`}>{p.status}</span></div>
      <h3 id={`p-${p.id}`}>{p.name}</h3>
      <p>{p.description}</p>
      <ul className="tags" aria-label="Technologies">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
      <div className="pc-links">
        {p.github ? <a href={p.github} target="_blank" rel="noreferrer" className="link-chip"><Github size={14} aria-hidden="true" /> Code</a> : <span className="link-chip off"><Lock size={13} aria-hidden="true" /> Code not yet public</span>}
        {p.demo === '/' ? <a href="#home" className="link-chip"><ExternalLink size={14} aria-hidden="true" /> You're viewing it</a> : p.demo ? <a href={p.demo} target="_blank" rel="noreferrer" className="link-chip"><ExternalLink size={14} aria-hidden="true" /> Live demo</a> : <span className="link-chip off">Demo not available yet</span>}
      </div>
    </div>
  </article></Reveal>;
}

export function ProjectsSection() {
  return <section id="projects" className="section page" aria-labelledby="projects-h">
    <div id="projects-h"><SectionHead label="03 / EXPERIMENTS & CREATIONS" lines={['Small beginnings.', 'Big ambitions.']} accent={1} /></div>
    <div className="gallery">{projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}</div>
  </section>;
}

/* ─── 04 JOURNEY ───────────────────────────────────────── */
export function JourneySection() {
  return <section id="journey" className="section page" aria-labelledby="journey-h">
    <div id="journey-h"><SectionHead label="04 / THE ROAD AHEAD" lines={['Currently writing', 'my first chapter.']} accent={1} /></div>
    <div className="journey-grid">
      <ol className="timeline">
        {journey.map((j, i) => { const Icon = journeyIcons[j.icon as keyof typeof journeyIcons]; return <Reveal as="li" key={j.when} delay={i * 110} className={`tl-item ${j.when === 'Now' ? 'tl-now' : ''}`}>
          <span className="tl-icon"><Icon size={16} aria-hidden="true" /></span>
          <div><p className="tl-when">{j.when}</p><h3>{j.title}</h3><p>{j.text}</p></div>
        </Reveal>; })}
      </ol>
      <Reveal delay={200}><aside className="edu glass" aria-label="Education">
        <GraduationCap size={26} className="edu-icon" aria-hidden="true" />
        <p className="eyebrow">EDUCATION</p>
        <h3>{profile.degree} · {profile.shortBranch}</h3>
        <dl><div><dt>College</dt><dd>{profile.college}</dd></div><div><dt>Branch</dt><dd>{profile.branch}</dd></div><div><dt>Current stage</dt><dd>{profile.stage}</dd></div><div><dt>Expected graduation</dt><dd>{profile.graduationYear}</dd></div></dl>
      </aside></Reveal>
    </div>
  </section>;
}

/* ─── 05 CONTACT ───────────────────────────────────────── */
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
export function ContactSection() {
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email); setCopied('ok'); } catch { setCopied('fail'); } setTimeout(() => setCopied('idle'), 2600); };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const name = String(f.get('name') ?? '').trim(), email = String(f.get('email') ?? '').trim(), message = String(f.get('message') ?? '').trim();
    const er: Errors = {};
    if (name.length < 2) er.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) er.email = 'Please enter a valid email address.';
    if (message.length < 10) er.message = 'Message should be at least 10 characters.';
    setErrors(er); setDone(false); if (Object.keys(er).length) return;
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${name}`)}&body=${body}`;
    setDone(true);
  };
  return <section id="contact" className="section contact" aria-labelledby="contact-h">
    <div className="contact-bg" aria-hidden="true" />
    <div className="page">
      <div id="contact-h"><SectionHead label="05 / YOUR TURN" lines={['Got an idea?', "Let's make it real."]} accent={1} /></div>
      <div className="contact-grid">
        <div>
          <Reveal><p className="lede">Open to learning, collaborating, building projects, and connecting with people who love technology.</p></Reveal>
          <Reveal delay={120}><div className="contact-links">
            <a href={`mailto:${profile.email}`} className="clink"><Mail size={18} aria-hidden="true" /><span><b>Email</b>{profile.email}</span></a>
            <button type="button" onClick={copy} className="clink" aria-label="Copy email address"> {copied === 'ok' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}<span><b>{copied === 'ok' ? 'Copied!' : copied === 'fail' ? 'Copy failed' : 'Copy email'}</b>{copied === 'fail' ? 'Please copy it manually' : 'One click to clipboard'}</span></button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="clink"><Linkedin size={18} aria-hidden="true" /><span><b>LinkedIn</b>Shaurya Jain</span></a>
            {profile.github ? <a href={profile.github} target="_blank" rel="noreferrer" className="clink"><Github size={18} aria-hidden="true" /><span><b>GitHub</b>View profile</span></a> : <span className="clink off" aria-disabled="true"><Github size={18} aria-hidden="true" /><span><b>GitHub</b>Not yet available</span></span>}
          </div></Reveal>
          <p className="sr-only" aria-live="polite">{copied === 'ok' ? 'Email copied to clipboard' : ''}</p>
        </div>
        <Reveal delay={160}><form className="form glass" onSubmit={submit} noValidate aria-describedby="form-note">
          {(['name', 'email'] as const).map(k => <label key={k} className="field"><span>{k === 'name' ? 'Your name' : 'Your email'}</span>
            <input name={k} type={k === 'email' ? 'email' : 'text'} autoComplete={k} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} />
            {errors[k] && <em id={`${k}-err`} className="err">{errors[k]}</em>}</label>)}
          <label className="field"><span>Message</span><textarea name="message" rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} />{errors.message && <em id="message-err" className="err">{errors.message}</em>}</label>
          <button className="btn btn-primary" type="submit">Open in my email app <Send size={15} aria-hidden="true" /></button>
          <p id="form-note" className="form-note">This form doesn’t send anything by itself — it prepares the message in your own email app so you can send it.</p>
          {done && <p className="ok" role="status"><Sparkles size={14} aria-hidden="true" /> Your email app should now be open with the message ready. Hit send there to reach me.</p>}
        </form></Reveal>
      </div>
      <Reveal><p className="final serif">Thanks for exploring my little corner of the internet. <span className="grad">✦</span></p></Reveal>
    </div>
  </section>;
}
