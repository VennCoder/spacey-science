"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message, ToolUseEvent, StreamChunk, QuizQuestion } from "@/types";
import { ToolOutput } from "./ToolOutput";
import { Send, Loader2 } from "lucide-react";

interface Props {
  topic: string;
  initialMessage: string;
  onQuizReady: (questions: QuizQuestion[]) => void;
}

export function AITutor({ topic, initialMessage, onQuizReady }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: initialMessage },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput("");

    const userMsg: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", toolUse: [] },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.filter((m) => m.content),
          topic,
          userMessage,
        }),
      });

      if (!res.ok) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content:
              "Sorry, I'm having trouble connecting right now. Please try again in a moment! 🚀",
          };
          return updated;
        });
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          try {
            const chunk: StreamChunk = JSON.parse(raw);

            if (chunk.type === "text_delta" && chunk.content) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + chunk.content,
                  };
                }
                return updated;
              });
            }

            if (chunk.type === "tool_use" && chunk.toolName) {
              const toolEvent: ToolUseEvent = {
                name: chunk.toolName,
                input: chunk.toolInput ?? {},
              };

              if (
                chunk.toolName === "generate_quiz" &&
                chunk.toolInput?.questions
              ) {
                onQuizReady(chunk.toolInput.questions as QuizQuestion[]);
              }

              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...last,
                    toolUse: [...(last.toolUse ?? []), toolEvent],
                  };
                }
                return updated;
              });
            }
          } catch {
            // malformed chunk, skip
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Oops! Something went wrong. Please try again! 🚀",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {msg.role === "assistant" ? (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm flex-shrink-0">
                    🤖
                  </div>
                  <div className="flex-1">
                    {msg.content && (
                      <div className="bg-white/10 backdrop-blur rounded-2xl rounded-tl-none px-4 py-3 text-white text-sm leading-relaxed">
                        {msg.content}
                        {i === messages.length - 1 && isStreaming && (
                          <span className="inline-block w-1.5 h-4 bg-white/70 ml-1 animate-pulse" />
                        )}
                      </div>
                    )}
                    {msg.toolUse?.map((tool, j) => (
                      <ToolOutput key={j} event={tool} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="bg-indigo-600 rounded-2xl rounded-tr-none px-4 py-3 text-white text-sm max-w-xs">
                    {msg.content}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ask Cosmo anything... or say 'quiz me'!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isStreaming}
          />
          <button
            onClick={sendMessage}
            disabled={isStreaming || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl px-4 py-3 transition-colors"
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-white/30 text-xs text-center mt-2">
          💡 Tip: Say "quiz me" when you are ready to test your knowledge!
        </p>
      </div>
    </div>
  );
}