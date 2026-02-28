"use client";
import { StarField } from "@/components/ui/StarField";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AITutor } from "@/components/tutor/AITutor";
import { QuizStep } from "./QuizStep";
import { BadgeModal } from "@/components/ui/BadgeModal";
import { TOPICS, TopicMeta } from "@/data/topics";
import { LessonProgress, QuizQuestion } from "@/types";
import { CheckCircle } from "lucide-react";

interface Props {
  topic: string;
}

const STUDENT_ID = process.env.NEXT_PUBLIC_STUDENT_ID ?? "student_demo_001";

const INTRO_MESSAGES: Record<string, string> = {
  moon: "Hi there, space explorer! 🌕 I'm Cosmo, your AI space guide! Today we're visiting the Moon — Earth's closest neighbour. Did you know the Moon is slowly drifting away from Earth at about 3.8 cm per year? Ask me anything, or say 'quiz me' when you're ready!",
  mars: "Welcome, future Mars explorer! 🔴 I'm Cosmo! Mars is one of the most exciting planets because scientists think it might once have had liquid water — and maybe even life! Ask me anything about the Red Planet, or say 'quiz me' when ready!",
  sun: "Greetings, solar scholar! ☀️ I'm Cosmo! The Sun is absolutely massive — you could fit 1.3 million Earths inside it! It's been shining for 4.6 billion years. Ask me anything about our star!",
  blackholes:
    "Hello, cosmic detective! 🌀 I'm Cosmo! Black holes are where space gets truly mind-bending. They're so dense that not even light can escape their gravity. What would you like to know?",
  iss: "Hey there, station commander! 🛸 I'm Cosmo! The ISS is a marvel of human teamwork — built by 15 countries and home to astronauts who float around, conduct experiments, and watch 16 sunrises a day! Ask away!",
};

export function LessonFlow({ topic }: Props) {
  const topicMeta = TOPICS.find((t) => t.id === topic) as TopicMeta;

const [step, setStep] = useState<"intro" | "interaction" | "quiz" | "complete">("intro");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await fetch(
          `/api/progress?studentId=${STUDENT_ID}&topic=${topic}`
        );
        const data = await res.json();
        if (data.progress?.step) {
          setStep(data.progress.step);
          if (data.progress.score !== null) setScore(data.progress.score);
        }
      } catch (err) {
        console.error("Failed to load progress", err);
      }
    }
    loadProgress();
  }, [topic]);

  async function saveProgress(
    newStep: LessonProgress["step"],
    newScore: number | null = null,
    badge: string | null = null
  ) {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: STUDENT_ID,
          topic,
          step: newStep,
          score: newScore,
          badge,
          completedAt:
            newStep === "complete" ? new Date().toISOString() : null,
          chatHistory: [],
        } satisfies LessonProgress),
      });
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  }

  function handleStartLesson() {
    setStep("interaction");
    saveProgress("interaction");
  }

  function handleQuizReady(questions: QuizQuestion[]) {
    setQuizQuestions(questions);
    setStep("quiz");
    saveProgress("quiz");
  }

  function handleQuizComplete(finalScore: number) {
    setScore(finalScore);
    const badge = finalScore >= 60 ? topicMeta.badge : null;
    setStep("complete");
    setShowBadge(true);
    saveProgress("complete", finalScore, badge);
  }

  const steps = ["intro", "interaction", "quiz"];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${topicMeta.color} relative overflow-hidden`}
    >
      <StarField count={80} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{topicMeta.emoji}</span>
          <div>
            <h1 className="text-white text-xl font-bold">{topicMeta.title}</h1>
            <p className="text-white/60 text-sm">{topicMeta.tagline}</p>
          </div>
          <div className="ml-auto flex gap-2">
            {["Intro", "Learn", "Quiz"].map((label, i) => (
              <div key={label} className="flex items-center gap-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i < steps.indexOf(step)
                      ? "bg-green-500 text-white"
                      : i === steps.indexOf(step)
                      ? "bg-white text-black"
                      : "bg-white/20 text-white/50"
                  }`}
                >
                  {i < steps.indexOf(step) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="text-white/50 text-xs hidden sm:block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="text-8xl"
              >
                {topicMeta.emoji}
              </motion.div>
              <div>
                <h2 className="text-white text-3xl font-bold mb-2">
                  Mission: {topicMeta.title}
                </h2>
                <p className="text-white/70 text-lg max-w-md">
                  Get ready to explore! Your AI guide Cosmo will teach you
                  everything about <strong>{topicMeta.title}</strong> and quiz
                  you at the end. Earn the{" "}
                  <strong>{topicMeta.badgeLabel}</strong> badge!
                </p>
              </div>
              <button
                onClick={handleStartLesson}
                className="px-8 py-4 bg-white text-black font-bold rounded-2xl text-lg hover:bg-white/90 transition-colors shadow-lg"
              >
                Begin Mission 🚀
              </button>
            </motion.div>
          )}

          {step === "interaction" && (
            <motion.div
              key="interaction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden flex flex-col"
              style={{ height: "calc(100vh - 160px)" }}
            >
              <div className="p-3 border-b border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-xs">Cosmo is online</span>
              </div>
              <AITutor
                topic={topic}
                initialMessage={
                  INTRO_MESSAGES[topic] ??
                  `Hi! I'm Cosmo. Let's learn about ${topic}!`
                }
                onQuizReady={handleQuizReady}
              />
            </motion.div>
          )}

          {step === "quiz" && quizQuestions.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex-1 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 overflow-y-auto"
            >
              <h2 className="text-white text-xl font-bold mb-6 text-center">
                🧠 Quiz Time!
              </h2>
              <QuizStep
                questions={quizQuestions}
                onComplete={handleQuizComplete}
              />
            </motion.div>
          )}

          {step === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">{topicMeta.badge}</div>
                <p className="text-white text-2xl font-bold">
                  Mission Complete!
                </p>
                <p className="text-white/60 text-lg">
                  Final Score:{" "}
                  <strong className="text-white">{score}%</strong>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Badge modal */}
      {showBadge && score !== null && (
        <BadgeModal
          topic={topicMeta}
          score={score}
          onContinue={() => {
            setShowBadge(false);
            if (score < 60) {
              setStep("quiz");
            }
          }}
        />
      )}
    </div>
  );
}