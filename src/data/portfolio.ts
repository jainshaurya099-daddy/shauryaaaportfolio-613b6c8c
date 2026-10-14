// ─────────────────────────────────────────────────────────────
// EDIT ME — every personal detail on the site lives in this file.
// Leave a link as '' when it does not exist yet; the site then shows
// "not yet available" instead of a fake link.
// ─────────────────────────────────────────────────────────────
export const profile = {
  name: 'Shaurya Jain',
  degree: 'B.Tech',
  branch: 'Computer Science Engineering — Artificial Intelligence & Machine Learning',
  shortBranch: 'CSE AI & ML',
  stage: 'First-year student',
  college: 'JECRC University',
  graduationYear: '2030',
  email: 'shaurya.26bcon2753@jecrcu.edu.in',
  linkedin: 'https://www.linkedin.com/in/shaurya-jain-39558b221?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  github: '', // add your GitHub profile URL here when it exists
  photo: '', // add an image URL/import here to replace the abstract avatar
  introduction:
    'I’m a first-year B.Tech CSE AI & ML student building strong foundations in programming, exploring artificial intelligence, and slowly turning curiosity into practical projects. I learn best by doing — writing small programs, breaking things, and figuring out why they broke.',
};

export const roles = ['Aspiring AI/ML Engineer', 'Developer in Progress', 'Problem Solver', 'Future Software Engineer'] as const;

export const profilePanel = [
  { k: 'Current mission', v: 'Master the fundamentals' },
  { k: 'Exploring', v: 'AI, ML & software development' },
  { k: 'Mindset', v: 'Learn → Build → Improve' },
  { k: 'Long-term goal', v: 'Create technology that solves real problems' },
];

export type SkillLevel = 'Practicing' | 'Beginner' | 'Exploring';
export const skillGroups = [
  { group: 'Currently Practicing', skills: [
    { name: 'C Programming', icon: 'terminal', level: 'Practicing' as SkillLevel, text: 'Core syntax, loops and logic.', detail: 'Working through pointers, arrays and writing small console programs.' },
    { name: 'Python', icon: 'python', level: 'Beginner' as SkillLevel, text: 'Readable code for everything.', detail: 'Learning data types, functions and the basics I’ll need for ML later.' },
    { name: 'Problem Solving', icon: 'puzzle', level: 'Practicing' as SkillLevel, text: 'Breaking problems into steps.', detail: 'Practising logic-building and beginner DSA patterns.' },
  ]},
  { group: 'Web Foundations', skills: [
    { name: 'HTML', icon: 'html', level: 'Beginner' as SkillLevel, text: 'Structure of the web.', detail: 'Semantic elements and accessible page structure.' },
    { name: 'CSS', icon: 'css', level: 'Beginner' as SkillLevel, text: 'Layout and visual design.', detail: 'Flexbox, grid and responsive layouts that work on phones.' },
    { name: 'JavaScript', icon: 'js', level: 'Beginner' as SkillLevel, text: 'Making pages interactive.', detail: 'DOM events, functions and small interactive experiments.' },
  ]},
  { group: 'Exploring AI', skills: [
    { name: 'Artificial Intelligence', icon: 'brain', level: 'Exploring' as SkillLevel, text: 'How machines reason.', detail: 'Reading about core ideas and how AI tools are actually built.' },
    { name: 'Machine Learning', icon: 'network', level: 'Exploring' as SkillLevel, text: 'Learning from data.', detail: 'Starting with the intuition behind models before the math.' },
  ]},
];

export type ProjectStatus = 'In Progress' | 'Learning' | 'Planned';
export const projects: { id: string; name: string; description: string; tags: string[]; status: ProjectStatus; visual: 'browser' | 'code' | 'neural'; github: string; demo: string }[] = [
  { id: '01', name: 'Personal Portfolio', description: 'A responsive website introducing my journey as a student developer.', tags: ['HTML', 'CSS', 'JavaScript'], status: 'In Progress', visual: 'browser', github: '', demo: '/' },
  { id: '02', name: 'C Programming Playground', description: 'A collection of beginner programs, experiments, and programming fundamentals.', tags: ['C', 'Logic Building'], status: 'Learning', visual: 'code', github: '', demo: '' },
  { id: '03', name: 'AI Exploration Lab', description: 'A growing space for AI/ML experiments, learning notes, and future projects.', tags: ['Python', 'AI/ML'], status: 'Planned', visual: 'neural', github: '', demo: '' },
];

export const journey = [
  { when: 'Started', icon: 'flag', title: 'Beginning my B.Tech journey', text: `Joined ${'JECRC University'} for CSE with a specialisation in AI & ML.` },
  { when: 'Now', icon: 'code', title: 'Learning programming & web fundamentals', text: 'C, Python, HTML, CSS and JavaScript — one concept at a time.' },
  { when: 'Next', icon: 'hammer', title: 'Building practical projects', text: 'Turning lessons into small projects and strengthening problem-solving.' },
  { when: 'Future', icon: 'rocket', title: 'Advanced AI/ML & internships', text: 'Exploring deeper AI/ML work and looking for internship opportunities.' },
];

export const commands = ['help', 'about', 'skills', 'projects', 'future', 'contact', 'clear'] as const;

export function terminalOutput(input: string): string {
  const command = input.trim().toLowerCase();
  switch (command) {
    case 'help': return 'Available commands: ' + commands.join(' · ');
    case 'about': return `${profile.name} — ${profile.stage}, ${profile.degree} ${profile.shortBranch} at ${profile.college}.\n${profile.introduction}`;
    case 'skills': return skillGroups.map(g => `${g.group}: ${g.skills.map(s => `${s.name} [${s.level}]`).join(', ')}`).join('\n');
    case 'projects': return projects.map(p => `${p.id} ${p.name} [${p.status}]\n   ${p.description}`).join('\n');
    case 'future': return journey.map(j => `${j.when.padEnd(7)}→ ${j.title}`).join('\n') + `\nExpected graduation: ${profile.graduationYear}`;
    case 'contact': return `Email: ${profile.email}\nLinkedIn: ${profile.linkedin}`;
    case 'clear': return '';
    default: return `Command not found: ${input.slice(0, 100)}. Type help to see available commands.`;
  }
}
