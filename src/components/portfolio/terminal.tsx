import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Terminal as TerminalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { commands, terminalOutput } from '@/data/portfolio';

export function DeveloperTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string }[]>([{ command: 'hello', output: 'Welcome to my corner of the internet.\nType help to start exploring.' }]);
  const [recall, setRecall] = useState<string[]>([]);
  const [position, setPosition] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; }, [history]);
  function run(value: string) {
    const command = value.trim().slice(0, 100);
    if (!command) return;
    setHistory(old => command.toLowerCase() === 'clear' ? [] : [...old.slice(-49), { command, output: terminalOutput(command) }]);
    setRecall(old => [...old, command]); setPosition(recall.length + 1); setInput('');
  }
  return <section className="terminal-section page-width reveal">
    <div className="terminal-intro"><span className="eyebrow"><TerminalIcon size={14} /> A DIFFERENT WAY TO EXPLORE</span><h2>A little curiosity.<br /><span className="text-muted-foreground">A few commands.</span></h2><p>Meet the student behind the screen.</p><span className="terminal-note">shaurya@portfolio:~</span></div>
    <div className="terminal-window"><div className="terminal-title"><div className="window-dots"><i /><i /><i /></div><span>shaurya — interactive terminal</span><TerminalIcon size={14} /></div>
      <div className="terminal-output" ref={outputRef} aria-live="polite" role="log">{history.map((entry, i) => <div key={i} className="terminal-entry"><div className="terminal-prompt">❯ <span>{entry.command}</span></div><div className="terminal-text">{entry.output}</div></div>)}</div>
      <form className="terminal-input" onSubmit={e => { e.preventDefault(); run(input); }}><span>❯</span><input aria-label="Terminal command" maxLength={100} autoComplete="off" spellCheck={false} placeholder="Type a command…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); const next = e.key === 'ArrowUp' ? Math.max(0, position - 1) : Math.min(recall.length, position + 1); setPosition(next); setInput(recall[next] ?? ''); } }} /><Button size="icon" variant="ghost" type="submit" aria-label="Run command"><ArrowUpRight /></Button></form>
      <div className="terminal-commands">{commands.map(command => <Button key={command} size="sm" variant="ghost" onClick={() => run(command)}>{command}</Button>)}</div>
    </div>
  </section>;
}
