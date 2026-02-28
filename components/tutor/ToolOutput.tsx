"use client";
import { motion } from "framer-motion";
import { ToolUseEvent } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  event: ToolUseEvent;
}

export function ToolOutput({ event }: Props) {
  const router = useRouter();

  if (event.name === "navigate_to_topic") {
    const topic = (event.input as { topic: string }).topic;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-3 p-4 bg-indigo-900/50 border border-indigo-500 rounded-xl flex items-center gap-3 cursor-pointer"
        onClick={() => router.push(`/lesson/${topic}`)}
      >
        <span className="text-2xl">🚀</span>
        <div>
          <p className="text-indigo-200 font-semibold text-sm">
            Navigating you to…
          </p>
          <p className="text-white font-bold capitalize">{topic}</p>
        </div>
        <span className="ml-auto text-indigo-400">→</span>
      </motion.div>
    );
  }

  if (event.name === "show_space_fact") {
    const { fact, emoji } = event.input as { fact: string; emoji: string };
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-3 p-4 bg-gradient-to-r from-yellow-900/60 to-orange-900/60 border border-yellow-600 rounded-xl"
      >
        <p className="text-yellow-300 text-xs font-semibold uppercase tracking-widest mb-1">
          ✨ Space Fact
        </p>
        <p className="text-white text-sm">
          {emoji} {fact}
        </p>
      </motion.div>
    );
  }

  return null;
}