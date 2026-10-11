import { createFileRoute } from '@tanstack/react-router';
import { AboutSection } from '@/components/portfolio/sections';
export const Route = createFileRoute('/about')({
  head: () => ({ meta: [
    { title: 'About — Shaurya Jain' },
    { name: 'description', content: "The human behind the code — a first-year B.Tech CSE AI & ML student just getting started." },
    { property: 'og:title', content: 'About — Shaurya Jain' },
    { property: 'og:description', content: "The human behind the code — a first-year B.Tech CSE AI & ML student just getting started." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: '/about' },
  ], links: [{ rel: 'canonical', href: '/about' }] }),
  component: () => <div className="subpage"><AboutSection /></div>,
});
