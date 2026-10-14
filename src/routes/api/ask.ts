import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { assistantInstructions, boundMessages } from "@/lib/assistant-prompt";

export const Route = createFileRoute("/api/ask")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "The assistant isn't set up right now." }, { status: 500 });
        let messages: UIMessage[];
        try { ({ messages } = (await request.json()) as { messages: UIMessage[] }); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }
        if (!Array.isArray(messages) || !messages.length) return Response.json({ error: "Bad request" }, { status: 400 });
        const { createResponsesCall } = await import("@/lib/ai/responses.server");
        return createResponsesCall(request, { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" }, await convertToModelMessages(boundMessages(messages)), assistantInstructions()).response();
      },
    },
  },
});
