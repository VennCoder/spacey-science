import { KNOWLEDGE_BASE, KnowledgeChunk } from "./knowledge-base";

function score(chunk: KnowledgeChunk, query: string): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/);
  let hits = 0;
  for (const kw of chunk.keywords) {
    if (q.includes(kw) || kw.split(" ").some((k) => words.includes(k))) {
      hits++;
    }
  }
  if (words.includes(chunk.topic) || q.includes(chunk.topic)) hits += 3;
  return hits;
}

export function retrieve(
  query: string,
  topic: string,
  topK = 4
): KnowledgeChunk[] {
  return KNOWLEDGE_BASE.filter((c) => c.topic === topic)
    .map((c) => ({ chunk: c, score: score(c, query) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((r) => r.chunk);
}

export function buildContext(chunks: KnowledgeChunk[]): string {
  return chunks.map((c) => `• ${c.text}`).join("\n");
}