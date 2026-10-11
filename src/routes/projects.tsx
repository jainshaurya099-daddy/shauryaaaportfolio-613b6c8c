import { createFileRoute } from '@tanstack/react-router';
import { ProjectsSection, PageIntro } from '@/components/portfolio/sections';
export const Route = createFileRoute('/projects')({
 head: () => ({ meta: [
  { title: 'Projects — Shaurya Jain' },
  { name: 'description', content: 'An honest look at my early projects and programming practice. No finished masterpieces — just meaningful beginnings.' },
  { property: 'og:title', content: 'Projects — Shaurya Jain' },
  { property: 'og:description', content: 'An honest look at my early projects and programming practice. No finished masterpieces — just meaningful beginnings.' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: '/projects' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ], links: [{ rel: 'canonical', href: '/projects' }] }),
 component: Page,
});
function Page() { return <><PageIntro label="PROJECTS" title="Experiments in Progress" text={'An honest look at my early projects and programming practice. No finished masterpieces — just meaningful beginnings.'} /><ProjectsSection /></>; }
