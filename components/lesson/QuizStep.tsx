"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/types";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export function QuizStep({ questions, onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = questions[current];
  const isLast = current === questions.length - 1;

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
  }

  function handleNext() {
    if (selected === null) return;

    const updatedResults = [...results, selected === q.correctIndex];
    setResults(updatedResults);

    if (isLast) {
      const score = Math.round(
        (updatedResults.filter(Boolean).length / questions.length) * 100
      );
      onComplete(score);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < current
                ? "bg-green-500"
                : i === current
                ? "bg-indigo-400"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className="space-y-4"
        >
          <p className="text-white/60 text-sm">
            Question {current + 1} of {questions.length}
          </p>
          <h3 className="text-white text-xl font-semibold">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let style =
                "border border-white/20 bg-white/5 hover:bg-white/10 text-white cursor-pointer";
              if (selected !== null) {
                if (idx === q.correctIndex)
                  style =
                    "border border-green-500 bg-green-900/40 text-green-300 cursor-default";
                else if (idx === selected)
                  style =
                    "border border-red-500 bg-red-900/40 text-red-300 cursor-default";
                else
                  style =
                    "border border-white/10 bg-white/5 text-white/40 cursor-default";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3 ${style}`}
                >
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">
                    {["A", "B", "C", "D"][idx]}
                  </span>
                  {opt}
                  {selected !== null && idx === q.correctIndex && (
                    <CheckCircle className="ml-auto w-5 h-5 flex-shrink-0" />
                  )}
                  {selected === idx && idx !== q.correctIndex && (
                    <XCircle className="ml-auto w-5 h-5 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-indigo-900/40 border border-indigo-600 rounded-xl"
            >
              <p className="text-indigo-200 text-sm">
                <span className="font-semibold">Cosmo says: </span>
                {q.explanation}
              </p>
            </motion.div>
          )}

          {selected !== null && (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors"
            >
              {isLast ? "See My Results! 🎉" : "Next Question →"}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}