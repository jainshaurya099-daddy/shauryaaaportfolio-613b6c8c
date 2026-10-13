import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { profile, profilePanel, skillGroups, projects, journey } from "@/data/portfolio";

function instructions() {
  const facts = {
    profile: { ...profile, photo: undefined, github: profile.github || "Not available yet" },
    profilePanel, skillGroups, projects: projects.map(p => ({ ...p, github: p.github || "Code not yet public", demo: p.demo || "Not available yet" })), journey,
  };
  return `You are the friendly assistant on ${profile.name}'s personal portfolio website. Answer visitors' questions about Shaurya's background, studies, skills, projects and goals.
Rules:
- Use ONLY the facts below. If something isn't covered, say you don't know and suggest contacting Shaurya at ${profile.email}.
- Shaurya is a first-year student and beginner. Never call him an expert or experienced. Never invent achievements, jobs, certifications, stats, links or a GitHub profile.
- Planned projects are planned, not finished. Respect each project's status.
- Keep answers short (2-5 sentences), warm and plain. Speak about Shaurya in the third person.
- Politely decline unrelated requests (homework, code generation, other topics).
FACTS (JSON):
${JSON.stringify(facts)}`;
}

export const Route = createFileRoute("/api/ask")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "The assistant isn't set up right now." }, { status: 500 });
        let messages: UIMessage[];
        try { ({ messages } = (await request.json()) as { messages: UIMessage[] }); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }
        if (!Array.isArray(messages) || !messages.length) return Response.json({ error: "Bad request" }, { status: 400 });
        // Keep cost bounded: last 12 turns, user text capped.
        const recent = messages.slice(-12).map(m => ({ ...m, parts: m.parts.filter(p => p.type === "text").map(p => ({ ...p, text: (p as { text: string }).text.slice(0, 800) })) })) as UIMessage[];
        const { createResponsesCall } = await import("@/lib/ai/responses.server");
        return createResponsesCall(request, { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" }, await convertToModelMessages(recent), instructions()).response();
      },
    },
  },
});
