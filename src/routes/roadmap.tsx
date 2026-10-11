import { createFileRoute } from '@tanstack/react-router';
import { RoadmapSection, PageIntro } from '@/components/portfolio/sections';
export const Route = createFileRoute('/roadmap')({
 head: () => ({ meta: [
  { title: 'My Roadmap — Shaurya Jain' },
  { name: 'description', content: 'A learning roadmap from my first year at JECRC University to industry readiness by graduation in 2030.' },
  { property: 'og:title', content: 'My Roadmap — Shaurya Jain' },
  { property: 'og:description', content: 'A learning roadmap from my first year at JECRC University to industry readiness by graduation in 2030.' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: '/roadmap' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ], links: [{ rel: 'canonical', href: '/roadmap' }] }),
 component: Page,
});
function Page() { return <><PageIntro label="MY ROADMAP" title="Where I’m Headed" text={'A learning roadmap from my first year at JECRC University to industry readiness by graduation in 2030.'} /><RoadmapSection /></>; }
