export const profile = {
  name: 'Shaurya Jain',
  email: 'shaurya.26bcon2753@jecrcu.edu.in',
  linkedin: 'https://www.linkedin.com/in/shaurya-jain-39558b221?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  introduction: 'I’m a first-year Computer Science Engineering student at JECRC University, exploring programming, software development, and Artificial Intelligence & Machine Learning. I’m focused on building strong technical foundations, learning by doing, and developing projects that solve real-world problems.',
};
export const projects = [
  { id: '01', name: 'Personal Portfolio Website', purpose: 'Present my background, learning journey, interests, and future projects.', status: 'In Progress', technologies: ['React', 'TypeScript', 'Tailwind CSS'], visual: 'portfolio' },
  { id: '02', name: 'C Programming Practice', purpose: 'Practice basic programming concepts and improve logical thinking.', status: 'Learning', technologies: ['C'], visual: 'code' },
  { id: '03', name: 'Beginner Web Development Experiments', purpose: 'Explore website structure, styling, and interactive behavior.', status: 'Learning', technologies: ['HTML', 'CSS', 'JavaScript'], visual: 'web' },
];
export const skills = [
  { title: 'Programming', icon: 'code', status: 'Learning', items: ['C programming', 'Python'] },
  { title: 'Web Development', icon: 'web', status: 'Learning', items: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Computer Science Fundamentals', icon: 'database', status: 'Building Foundations', items: ['Data Structures & Algorithms', 'Problem-solving', 'Database fundamentals'] },
  { title: 'Emerging Technologies', icon: 'brain', status: 'Exploring', items: ['AI/ML fundamentals', 'Data analysis', 'Cloud computing', 'Cybersecurity', 'Prompt engineering'] },
];
export const stages = [
  { title: 'Build the Foundation', text: 'Strengthen programming, logical thinking, and core computer science concepts.', label: 'CURRENT FOCUS' },
  { title: 'Create and Experiment', text: 'Build beginner projects and practise writing code.', label: 'NEXT STEPS' },
  { title: 'Explore AI/ML', text: 'Learn the fundamentals of machine learning and experiment with practical applications.', label: 'ON THE HORIZON' },
  { title: 'Prepare for the Future', text: 'Develop projects, improve problem-solving, and work towards campus placement readiness by graduation.', label: 'LOOKING TOWARDS 2030' },
];
export const commands = ['help', 'about', 'skills', 'projects', 'journey', 'contact', 'clear'] as const;
export function terminalOutput(input: string): string {
  const command = input.trim().toLowerCase();
  switch (command) {
    case 'help': return 'Available commands: ' + commands.join(' · ');
    case 'about': return profile.name + ' — Aspiring AI/ML engineer and software developer.\n' + profile.introduction;
    case 'skills': return skills.map(s => `${s.title} [${s.status}]: ${s.items.join(', ')}`).join('\n');
    case 'projects': return projects.map(p => `${p.name} [${p.status}]\n  ${p.purpose}`).join('\n');
    case 'journey': return 'JECRC University · First-year B.Tech CSE AI & ML · Expected graduation: 2030\n' + stages.map((s, i) => `${i + 1}. ${s.title} — ${s.text}`).join('\n');
    case 'contact': return `Email: ${profile.email}\nLinkedIn: ${profile.linkedin}`;
    case 'clear': return '';
    default: return `Command not found: ${input.slice(0, 100)}. Type help to see available commands.`;
  }
}
