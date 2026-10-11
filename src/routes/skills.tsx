import { createFileRoute } from '@tanstack/react-router';
import { SkillsSection } from '@/components/portfolio/sections';
export const Route = createFileRoute('/skills')({
  head: () => ({ meta: [
    { title: 'Skills — Shaurya Jain' },
    { name: 'description', content: "Tools Shaurya Jain is learning and ideas he's exploring — C, Python, web foundations and AI." },
    { property: 'og:title', content: 'Skills — Shaurya Jain' },
    { property: 'og:description', content: "Tools Shaurya Jain is learning and ideas he's exploring — C, Python, web foundations and AI." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: '/skills' },
  ], links: [{ rel: 'canonical', href: '/skills' }] }),
  component: () => <div className="subpage"><SkillsSection /></div>,
});
