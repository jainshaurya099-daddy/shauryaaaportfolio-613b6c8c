import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { commands, terminalOutput } from '@/data/portfolio';
import { Reveal, SectionHead } from './effects';

type Entry = { cmd: string; out: string };
export function DeveloperTerminal() {
  const [log, setLog] = useState<Entry[]>([{ cmd: 'help', out: terminalOutput('help') }]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [pos, setPos] = useState(-1);
  const body = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => { if (first.current) { first.current = false; return; } body.current?.scrollTo({ top: body.current.scrollHeight, behavior: 'smooth' }); }, [log]);
  const run = (raw: string) => {
    const cmd = raw.trim(); if (!cmd) return;
    setHistory(h => [...h, cmd]); setPos(-1); setValue('');
    if (cmd.toLowerCase() === 'clear') { setLog([]); return; }
    setLog(l => [...l, { cmd, out: terminalOutput(cmd) }]);
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') run(value);
    else if (e.key === 'ArrowUp' && history.length) { e.preventDefault(); const p = pos < 0 ? history.length - 1 : Math.max(0, pos - 1); setPos(p); setValue(history[p] ?? ''); }
    else if (e.key === 'ArrowDown' && pos >= 0) { e.preventDefault(); const p = pos + 1; if (p >= history.length) { setPos(-1); setValue(''); } else { setPos(p); setValue(history[p] ?? ''); } }
  };
  return <section id="playground" className="section page" aria-labelledby="brain-h">
    <div id="brain-h"><SectionHead label="✦ / THE INTERACTIVE PLAYGROUND" lines={['Inside my', 'digital brain.']} accent={1} /></div>
    <Reveal><div className="term glass">
      <div className="boot-bar"><i /><i /><i /><span>shaurya@brain: ~</span></div>
      <div ref={body} className="term-body" role="log" aria-live="polite" aria-label="Terminal output">
        {log.map((e, i) => <div key={i} className="term-entry"><p className="term-cmd"><span className="prompt">›</span> {e.cmd}</p><pre>{e.out}</pre></div>)}
        <label className="term-input"><span className="prompt" aria-hidden="true">›</span><span className="sr-only">Type a command</span>
          <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={onKey} spellCheck={false} autoCapitalize="none" autoComplete="off" placeholder="type a command…" />
        </label>
      </div>
      <div className="term-chips" aria-label="Quick commands">{commands.map(c => <button key={c} type="button" onClick={() => run(c)}>{c}</button>)}</div>
    </div></Reveal>
  </section>;
}
