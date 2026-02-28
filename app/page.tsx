import { StarField } from "@/components/ui/StarField";
import Link from "next/link";
import { TOPICS } from "@/data/topics";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white relative overflow-hidden">
      <StarField count={120} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Spacey Science 🚀
          </h1>
          <p className="text-white/60 text-lg mb-2">
            Explore the universe with your AI guide, Cosmo
          </p>
          <Link
            href="/dashboard"
            className="text-indigo-400 hover:text-indigo-300 text-sm underline transition-colors"
          >
            View My Progress →
          </Link>
        </div>

        {/* Topic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map((topic) => (
            <Link
              key={topic.id}
              href={`/lesson/${topic.id}`}
              className={`group relative bg-gradient-to-br ${topic.color} rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all hover:scale-105 hover:shadow-2xl`}
            >
              <div className="text-5xl mb-3">{topic.emoji}</div>
              <h2 className="text-white text-xl font-bold">{topic.title}</h2>
              <p className="text-white/60 text-sm mt-1">{topic.tagline}</p>
              <div className="mt-4 flex items-center gap-2 text-white/40 text-xs">
                <span>Earn:</span>
                <span>{topic.badge}</span>
                <span>{topic.badgeLabel}</span>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}