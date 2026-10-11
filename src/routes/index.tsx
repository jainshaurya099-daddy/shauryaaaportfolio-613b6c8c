import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/hero";
import { AboutSection, SkillsSection, ProjectsSection, RoadmapSection, ContactSection } from "@/components/portfolio/sections";
import { DeveloperTerminal } from "@/components/portfolio/terminal";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Shaurya Jain — Aspiring AI/ML Engineer" },
    { name: "description", content: "The learning journey of Shaurya Jain, first-year B.Tech CSE AI & ML student at JECRC University. Learning today. Building tomorrow." },
    { property: "og:title", content: "Shaurya Jain — Learning Today. Building Tomorrow." },
    { property: "og:description", content: "Explore my learning journey, programming experiments and future goals as an aspiring AI/ML engineer at JECRC University." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "/" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: Index,
});
function Index() {
  return <><Hero /><AboutSection preview /><SkillsSection /><ProjectsSection preview /><DeveloperTerminal /><RoadmapSection /><ContactSection /></>;
}
