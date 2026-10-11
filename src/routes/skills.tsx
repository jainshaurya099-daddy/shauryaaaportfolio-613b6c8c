import { createFileRoute } from '@tanstack/react-router';
import { SkillsSection, PageIntro } from '@/components/portfolio/sections';
export const Route = createFileRoute('/skills')({
 head: () => ({ meta: [
  { title: 'Skills & Learning Lab — Shaurya Jain' },
  { name: 'description', content: 'The technologies I’m learning, the foundations I’m building, and the ideas I’m exploring.' },
  { property: 'og:title', content: 'Skills & Learning Lab — Shaurya Jain' },
  { property: 'og:description', content: 'The technologies I’m learning, the foundations I’m building, and the ideas I’m exploring.' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: '/skills' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ], links: [{ rel: 'canonical', href: '/skills' }] }),
 component: Page,
});
function Page() { return <><PageIntro label="SKILLS & LEARNING LAB" title="Learning Without Limits" text={'The technologies I’m learning, the foundations I’m building, and the ideas I’m exploring.'} /><SkillsSection /></>; }
