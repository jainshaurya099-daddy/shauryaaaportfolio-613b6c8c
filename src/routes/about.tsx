import { createFileRoute } from '@tanstack/react-router';
import { AboutSection, PageIntro } from '@/components/portfolio/sections';
export const Route = createFileRoute('/about')({
 head: () => ({ meta: [
  { title: 'About — Shaurya Jain' },
  { name: 'description', content: 'A first-year student. A curious mind. A future built one step at a time.' },
  { property: 'og:title', content: 'About — Shaurya Jain' },
  { property: 'og:description', content: 'A first-year student. A curious mind. A future built one step at a time.' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: '/about' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ], links: [{ rel: 'canonical', href: '/about' }] }),
 component: Page,
});
function Page() { return <><PageIntro label="ABOUT" title="The Journey Begins" text={'A first-year student. A curious mind. A future built one step at a time.'} /><AboutSection /></>; }
