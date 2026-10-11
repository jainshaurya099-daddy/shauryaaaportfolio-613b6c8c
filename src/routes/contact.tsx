import { createFileRoute } from '@tanstack/react-router';
import { ContactSection } from '@/components/portfolio/sections';
export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [
    { title: 'Contact — Shaurya Jain' },
    { name: 'description', content: "Got an idea? Let's make it real. Reach Shaurya Jain by email or LinkedIn." },
    { property: 'og:title', content: 'Contact — Shaurya Jain' },
    { property: 'og:description', content: "Got an idea? Let's make it real. Reach Shaurya Jain by email or LinkedIn." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: '/contact' },
  ], links: [{ rel: 'canonical', href: '/contact' }] }),
  component: () => <div className="subpage"><ContactSection /></div>,
});
