import { createFileRoute } from '@tanstack/react-router';
import { JourneySection } from '@/components/portfolio/sections';
export const Route = createFileRoute('/journey')({
  head: () => ({ meta: [
    { title: 'Journey — Shaurya Jain' },
    { name: 'description', content: "Currently writing the first chapter — the road ahead for Shaurya Jain, B.Tech CSE AI & ML." },
    { property: 'og:title', content: 'Journey — Shaurya Jain' },
    { property: 'og:description', content: "Currently writing the first chapter — the road ahead for Shaurya Jain, B.Tech CSE AI & ML." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: '/journey' },
  ], links: [{ rel: 'canonical', href: '/journey' }] }),
  component: () => <div className="subpage"><JourneySection /></div>,
});
