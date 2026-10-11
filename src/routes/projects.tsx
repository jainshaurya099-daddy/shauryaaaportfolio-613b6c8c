import { createFileRoute } from '@tanstack/react-router';
import { ProjectsSection } from '@/components/portfolio/sections';
export const Route = createFileRoute('/projects')({
  head: () => ({ meta: [
    { title: 'Projects — Shaurya Jain' },
    { name: 'description', content: "Small beginnings, big ambitions — early experiments and creations by Shaurya Jain." },
    { property: 'og:title', content: 'Projects — Shaurya Jain' },
    { property: 'og:description', content: "Small beginnings, big ambitions — early experiments and creations by Shaurya Jain." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: '/projects' },
  ], links: [{ rel: 'canonical', href: '/projects' }] }),
  component: () => <div className="subpage"><ProjectsSection /></div>,
});
