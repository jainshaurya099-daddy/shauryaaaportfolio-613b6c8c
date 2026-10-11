import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/hero";
import { AboutSection, SkillsSection, ProjectsSection, JourneySection, ContactSection } from "@/components/portfolio/sections";
import { DeveloperTerminal } from "@/components/portfolio/terminal";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Shaurya Jain — Curious Mind. Infinite Possibilities." },
    { name: "description", content: "Shaurya Jain, first-year B.Tech CSE AI & ML student exploring AI, machine learning and the art of building things that matter." },
    { property: "og:title", content: "Shaurya Jain — Curious Mind. Infinite Possibilities." },
    { property: "og:description", content: "A student developer's digital universe: skills in progress, early experiments and the road ahead in AI/ML." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: Index,
});
function Index() {
  return <><Hero /><AboutSection /><SkillsSection /><ProjectsSection /><DeveloperTerminal /><JourneySection /><ContactSection /></>;
}
