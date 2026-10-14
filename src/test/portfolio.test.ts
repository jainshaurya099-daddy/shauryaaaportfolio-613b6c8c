import { describe, it, expect } from 'vitest';
import { profile, projects, terminalOutput } from '@/data/portfolio';
describe('Honest portfolio content and commands', () => {
 it('uses Shaurya’s exact contact details', () => {
  expect(profile.email).toBe('shaurya.26bcon2753@jecrcu.edu.in');
  expect(profile.linkedin).toBe('https://www.linkedin.com/in/shaurya-jain-39558b221?utm_source=share_via&utm_content=profile&utm_medium=member_android');
  expect(terminalOutput('contact')).toContain(profile.email);
 });
 it('has no invented GitHub link', () => {
  expect(profile.github).toBe('');
  expect(projects.every(p => p.github === '')).toBe(true);
 });
 it('lists the three requested projects with truthful statuses', () => {
  expect(projects.map(p => [p.name, p.status])).toEqual([
   ['Personal Portfolio', 'In Progress'], ['C Programming Playground', 'Learning'], ['AI Exploration Lab', 'Planned'],
  ]);
 });
 it('future command mentions graduation year', () => expect(terminalOutput('future')).toContain('Expected graduation: 2030'));
 it.each(['help','about','skills','projects','future','contact'])('responds to %s', command => {
  expect(terminalOutput(command)).not.toContain('Command not found');
 });
 it('clears and handles invalid input', () => {
  expect(terminalOutput('clear')).toBe('');
  expect(terminalOutput(' ABOUT ')).toBe(terminalOutput('about'));
  expect(terminalOutput('nope')).toContain('Command not found: nope');
 });
});
