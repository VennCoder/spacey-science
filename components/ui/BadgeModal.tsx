"use client";
import { motion } from "framer-motion";
import { TopicMeta } from "@/data/topics";

interface Props {
  topic: TopicMeta;
  score: number;
  onContinue: () => void;
}

export function BadgeModal({ topic, score, onContinue }: Props) {
  const passed = score >= 60;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="bg-gradient-to-br from-indigo-900 to-purple-900 border border-indigo-500 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-7xl mb-4"
        >
          {passed ? topic.badge : "📚"}
        </motion.div>

        <h2 className="text-white text-2xl font-bold mb-1">
          {passed ? `${topic.badgeLabel} Unlocked!` : "Keep Exploring!"}
        </h2>
        <p className="text-white/60 text-sm mb-4">
          {passed
            ? `You scored ${score}% — amazing work, space explorer!`
            : `You scored ${score}%. Review the lesson and try again!`}
        </p>

        <div className="flex justify-center gap-1 mb-6">
          {[1, 2, 3].map((star) => (
            <motion.span
              key={star}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * star }}
              className="text-2xl"
            >
              {score >= star * 33 ? "⭐" : "☆"}
            </motion.span>
          ))}
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors"
        >
          {passed ? "Back to Mission Control 🚀" : "Retry Quiz"}
        </button>
      </motion.div>
    </motion.div>
  );
}