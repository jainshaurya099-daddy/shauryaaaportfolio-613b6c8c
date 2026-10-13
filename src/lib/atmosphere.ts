// Sound + cinema mode. Synthesized with Web Audio (no files). Browser-only: call from effects/handlers.
import { useSyncExternalStore } from 'react';

type State = { sound: boolean; cinema: boolean; pulse: number };
let state: State = { sound: false, cinema: false, pulse: 0 };
const subs = new Set<() => void>();
const emit = () => subs.forEach(f => f());
const set = (p: Partial<State>) => { state = { ...state, ...p }; emit(); };
const SERVER: State = { sound: false, cinema: false, pulse: 0 };

export function useAtmosphere() {
  return useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f); }, () => state, () => SERVER);
}

let ctx: AudioContext | null = null;
let last = 0;
function ac() {
  if (!ctx) { const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext; if (!C) return null; ctx = new C(); }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}
function tone(freq: number, to: number, dur: number, gain: number, type: OscillatorType = 'square', delay = 0) {
  const c = ac(); if (!c) return;
  const t = c.currentTime + delay;
  const o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
  f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 4;
  o.type = type; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f).connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
}
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export type Sfx = 'click' | 'execute' | 'hover' | 'chime';
export function play(kind: Sfx, force = false) {
  if (typeof window === 'undefined' || (!state.sound && !force)) return;
  const now = performance.now();
  if (kind === 'hover' && (now - last < 60 || reduced())) return;
  last = now;
  if (kind === 'click') tone(1200, 400, 0.025, 0.12);
  else if (kind === 'hover') tone(1800, 1500, 0.012, 0.04, 'sine');
  else if (kind === 'execute') { tone(800, 1600, 0.05, 0.1, 'triangle'); tone(1600, 2400, 0.04, 0.06, 'sine', 0.045); }
  else { tone(660, 660, 0.25, 0.08, 'sine'); tone(990, 990, 0.3, 0.06, 'sine', 0.08); }
  set({ pulse: state.pulse + 1 });
}

export function initAtmosphere() {
  try { set({ sound: localStorage.getItem('sj-sound') === '1', cinema: localStorage.getItem('sj-cinema') === '1' }); } catch { /* ignore */ }
  document.documentElement.classList.toggle('cinema', state.cinema);
  const over = (e: PointerEvent) => { if (e.pointerType === 'mouse' && (e.target as Element)?.closest?.('a,button,.pcard,.tile')) { const el = (e.target as Element).closest('a,button,.pcard,.tile'); if (el && !el.contains(e.relatedTarget as Node)) play('hover'); } };
  const click = (e: MouseEvent) => { if ((e.target as Element)?.closest?.('a,button:not([data-sfx])')) play('click'); };
  document.addEventListener('pointerover', over); document.addEventListener('click', click);
  return () => { document.removeEventListener('pointerover', over); document.removeEventListener('click', click); };
}
export function toggleSound() {
  const sound = !state.sound; set({ sound });
  try { localStorage.setItem('sj-sound', sound ? '1' : '0'); } catch { /* ignore */ }
  if (sound) play('chime');
}
export function toggleCinema() {
  const cinema = !state.cinema; set({ cinema });
  document.documentElement.classList.toggle('cinema', cinema);
  try { localStorage.setItem('sj-cinema', cinema ? '1' : '0'); } catch { /* ignore */ }
  play('chime');
}
