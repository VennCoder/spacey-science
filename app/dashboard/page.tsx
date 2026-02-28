"use client";
import { useEffect, useState } from "react";
import { TOPICS } from "@/data/topics";
import Link from "next/link";

const STUDENT_ID = process.env.NEXT_PUBLIC_STUDENT_ID ?? "student_demo_001";

interface ProgressEntry {
  topic: string;
  step: string;
  score: number | null;
  badge: string | null;
  completedAt: string | null;
}

export default function Dashboard() {
  const [progressMap, setProgressMap] = useState<Record<string, ProgressEntry>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const entries = await Promise.all(
        TOPICS.map(async (t) => {
          const res = await fetch(
            `/api/progress?studentId=${STUDENT_ID}&topic=${t.id}`
          );
          const data = await res.json();
          return { topic: t.id, progress: data.progress };
        })
      );
      const map: Record<string, ProgressEntry> = {};
      for (const e of entries) {
        if (e.progress) map[e.topic] = e.progress;
      }
      setProgressMap(map);
      setLoading(false);
    }
    load();
  }, []);

  const completed = Object.values(progressMap).filter(
    (p) => p.step === "complete"
  ).length;
  const badges = Object.values(progressMap).filter((p) => p.badge);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="text-white/40 hover:text-white transition-colors text-sm"
          >
            ← Mission Control
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">My Space Journal 🌌</h1>
        <p className="text-white/50 mb-8">
          {completed}/{TOPICS.length} missions completed · {badges.length} badges earned
        </p>

        {loading ? (
          <div className="text-white/40 text-center py-12">
            Loading your progress…
          </div>
        ) : (
          <div className="space-y-3">
            {TOPICS.map((topic) => {
              const p = progressMap[topic.id];
              const isDone = p?.step === "complete";
              return (
                <div
                  key={topic.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    isDone
                      ? "bg-green-900/20 border-green-700"
                      : p
                      ? "bg-white/5 border-white/10"
                      : "bg-white/5 border-white/5 opacity-60"
                  }`}
                >
                  <span className="text-3xl">{topic.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{topic.title}</h3>
                    <p className="text-white/40 text-sm">
                      {isDone
                        ? `Score: ${p.score}% • ${
                            p.badge
                              ? `Badge: ${p.badge} ${topic.badgeLabel}`
                              : "Keep trying!"
                          }`
                        : p
                        ? `In progress: ${p.step}`
                        : "Not started"}
                    </p>
                  </div>
                  {p?.badge && (
                    <span className="text-2xl" title={topic.badgeLabel}>
                      {p.badge}
                    </span>
                  )}
                  <Link
                    href={`/lesson/${topic.id}`}
                    className="text-xs bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {isDone ? "Replay" : p ? "Continue" : "Start"}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}