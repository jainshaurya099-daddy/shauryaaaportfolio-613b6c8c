import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import ReactMarkdown from 'react-markdown';
import { MessageCircleQuestion, Send, Square, Trash2, X } from 'lucide-react';
import { assistantSuggestions } from '@/data/portfolio';
import { Monogram } from './shell';

const KEY = 'sj-assistant-v1';
const MAX = 800;

function textOf(m: UIMessage) { return m.parts.map(p => (p.type === 'text' ? p.text : '')).join(''); }

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loaded, setLoaded] = useState(false);
  const box = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const { messages, setMessages, sendMessage, status, error, stop, clearError } = useChat({
    id: 'portfolio-assistant',
    transport: new DefaultChatTransport({ api: '/api/ask' }),
  });
  const busy = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setMessages(JSON.parse(s) as UIMessage[]); } catch { /* ignore */ }
    setLoaded(true);
  }, [setMessages]);
  useEffect(() => {
    if (!loaded || busy) return;
    try { localStorage.setItem(KEY, JSON.stringify(messages.slice(-30))); } catch { /* ignore */ }
  }, [messages, busy, loaded]);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [messages, status]);
  useEffect(() => { if (open) box.current?.focus(); }, [open, status]);
  useEffect(() => {
    if (!open) return;
    const k = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open]);

  const ask = (q: string) => {
    const text = q.trim().slice(0, MAX); if (!text || busy) return;
    clearError(); setInput(''); void sendMessage({ text });
  };
  const submit = (e: FormEvent) => { e.preventDefault(); ask(input); };
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input); } };
  const reset = () => { stop(); setMessages([]); clearError(); try { localStorage.removeItem(KEY); } catch { /* ignore */ } };
  const last = messages[messages.length - 1];
  const waiting = status === 'submitted' || (status === 'streaming' && last?.role === 'assistant' && !textOf(last));

  return <>
    <button type="button" className={`ask-fab ${open ? 'hide' : ''}`} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-controls="ask-panel">
      <MessageCircleQuestion size={18} aria-hidden="true" /><span>Ask about me</span>
    </button>
    <section id="ask-panel" className={`ask glass ${open ? 'open' : ''}`} role="dialog" aria-modal="false" aria-labelledby="ask-title" hidden={!open}>
      <header className="ask-head">
        <Monogram size={28} />
        <div><h2 id="ask-title">Ask about Shaurya</h2><p>Answers come only from this portfolio.</p></div>
        {messages.length > 0 && <button type="button" onClick={reset} aria-label="Clear conversation" className="ask-icon"><Trash2 size={16} /></button>}
        <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="ask-icon"><X size={18} /></button>
      </header>
      <div ref={log} className="ask-log" role="log" aria-live="polite" aria-busy={busy}>
        {messages.length === 0 && <div className="ask-empty">
          <p>Hi! I can tell you about Shaurya's studies, skills, projects and goals. Try one of these:</p>
          <div className="ask-sugg">{assistantSuggestions.map(s => <button key={s} type="button" onClick={() => ask(s)}>{s}</button>)}</div>
        </div>}
        {messages.map(m => {
          const t = textOf(m); if (!t && m.role === 'assistant') return null;
          return <div key={m.id} className={`ask-msg ${m.role}`}>
            {m.role === 'user' ? <p>{t}</p> : <div className="ask-md"><ReactMarkdown>{t}</ReactMarkdown></div>}
          </div>;
        })}
        {waiting && <div className="ask-msg assistant ask-typing" aria-label="Assistant is thinking"><i /><i /><i /></div>}
        {error && <div className="ask-err" role="alert">The assistant couldn't answer right now. Please try again in a moment, or email Shaurya directly.</div>}
      </div>
      <form className="ask-form" onSubmit={submit}>
        <label htmlFor="ask-input" className="sr-only">Your question</label>
        <textarea id="ask-input" ref={box} rows={1} value={input} maxLength={MAX} onChange={e => setInput(e.target.value)} onKeyDown={onKey} placeholder="Ask a question…" />
        {busy
          ? <button type="button" onClick={stop} className="ask-send" aria-label="Stop answer"><Square size={14} /></button>
          : <button type="submit" className="ask-send" disabled={!input.trim()} aria-label="Send question"><Send size={16} /></button>}
      </form>
      <p className="ask-note">AI answers can be wrong. For anything important, contact Shaurya.</p>
    </section>
  </>;
}
