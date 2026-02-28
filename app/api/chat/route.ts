import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import { retrieve, buildContext } from "@/lib/rag/retriever";
import { Message } from "@/types";
import { buildSystemPrompt } from "@/lib/gemini";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { messages, topic, userMessage } = (await req.json()) as {
    messages: Message[];
    topic: string;
    userMessage: string;
  };

  const chunks = retrieve(userMessage, topic);
  const context = buildContext(chunks);

  const history = messages
    .filter((m) => m.content)
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

  history.push({ role: "user", content: userMessage });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: object) =>
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(obj)}\n\n`)
        );

      try {
        const response = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          max_tokens: 1024,
          messages: [
            { role: "system", content: buildSystemPrompt(topic, context) },
            ...history,
          ],
          stream: true,
        });

        let fullText = "";

        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) {
            fullText += text;
            send({ type: "text_delta", content: text });
          }
        }

        // Check if response is a quiz JSON
        const trimmed = fullText.trim();
        if (trimmed.startsWith("{") && trimmed.includes("generate_quiz")) {
          try {
            const parsed = JSON.parse(trimmed);
            if (parsed.type === "generate_quiz") {
              send({
                type: "tool_use",
                toolName: "generate_quiz",
                toolInput: { questions: parsed.questions },
              });
            }
          } catch {
            // not valid JSON, ignore
          }
        }

        send({ type: "done" });
        controller.close();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Groq stream error:", message);
        send({
          type: "text_delta",
          content: "Sorry, Cosmo is taking a break! Please try again in a moment 🚀",
        });
        send({ type: "done" });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}