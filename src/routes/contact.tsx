import { createFileRoute } from '@tanstack/react-router';
import { ContactSection, PageIntro } from '@/components/portfolio/sections';
export const Route = createFileRoute('/contact')({
 head: () => ({ meta: [
  { title: 'Contact — Shaurya Jain' },
  { name: 'description', content: 'Connect with Shaurya Jain to exchange ideas, talk about technology, or share a learning opportunity.' },
  { property: 'og:title', content: 'Contact — Shaurya Jain' },
  { property: 'og:description', content: 'Connect with Shaurya Jain to exchange ideas, talk about technology, or share a learning opportunity.' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: '/contact' },
  { name: 'twitter:card', content: 'summary_large_image' },
 ], links: [{ rel: 'canonical', href: '/contact' }] }),
 component: Page,
});
function Page() { return <><PageIntro label="CONTACT" title="Let’s Connect" text={'Connect with Shaurya Jain to exchange ideas, talk about technology, or share a learning opportunity.'} /><ContactSection /></>; }
