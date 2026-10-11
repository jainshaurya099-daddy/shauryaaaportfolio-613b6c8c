import { describe, it, expect } from 'vitest';
import { profile, projects, terminalOutput } from '@/data/portfolio';
describe('Honest portfolio content and commands', () => {
 it('uses Shaurya’s exact contact details', () => {
  expect(profile.email).toBe('shaurya.26bcon2753@jecrcu.edu.in');
  expect(profile.linkedin).toBe('https://www.linkedin.com/in/shaurya-jain-39558b221?utm_source=share_via&utm_content=profile&utm_medium=member_android');
  expect(terminalOutput('contact')).toContain(profile.email);
  expect(terminalOutput('contact')).toContain(profile.linkedin);
 });
 it('lists only the three supplied starter projects with truthful statuses', () => {
  expect(projects.map(p => [p.name, p.status])).toEqual([
   ['Personal Portfolio Website', 'In Progress'], ['C Programming Practice', 'Learning'], ['Beginner Web Development Experiments', 'Learning'],
  ]);
 });
 it('keeps academic roadmap future-focused with graduation in 2030', () => {
  expect(terminalOutput('journey')).toContain('First-year B.Tech CSE AI & ML');
  expect(terminalOutput('journey')).toContain('Expected graduation: 2030');
 });
 it.each(['help','about','skills','projects','journey','contact'])('responds to %s', command => {
  expect(terminalOutput(command).length).toBeGreaterThan(20);
  expect(terminalOutput(command)).not.toContain('Command not found');
 });
 it('clears terminal output', () => expect(terminalOutput('clear')).toBe(''));
 it('handles case, whitespace and invalid commands', () => {
  expect(terminalOutput(' ABOUT ')).toBe(terminalOutput('about'));
  expect(terminalOutput('nonexistent')).toContain('Command not found: nonexistent');
 });
});
