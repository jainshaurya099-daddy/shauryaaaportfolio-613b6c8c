import { describe, it, expect } from 'vitest';
import type { UIMessage } from 'ai';
import { assistantInstructions, boundMessages } from '@/lib/assistant-prompt';

describe('Portfolio assistant', () => {
  it('points visitors to the university email', () => {
    expect(assistantInstructions()).toContain('shaurya.26bcon2753@jecrcu.edu.in');
    expect(assistantInstructions()).not.toContain('gmail.com');
  });
  it('tells the model there is no GitHub yet', () => expect(assistantInstructions()).toContain('Not available yet'));
  it('includes the planned project as planned', () => expect(assistantInstructions()).toContain('"status":"Planned"'));
  it('keeps only the last 12 messages', () => {
    const msgs = Array.from({ length: 20 }, (_, i) => ({ id: String(i), role: 'user', parts: [{ type: 'text', text: 'q' + i }] })) as UIMessage[];
    const out = boundMessages(msgs);
    expect(out).toHaveLength(12);
    expect(out[0]?.id).toBe('8');
  });
  it('caps each message at 800 characters', () => {
    const out = boundMessages([{ id: 'a', role: 'user', parts: [{ type: 'text', text: 'x'.repeat(2000) }] }] as UIMessage[]);
    expect((out[0]?.parts[0] as { text: string }).text).toHaveLength(800);
  });
});
