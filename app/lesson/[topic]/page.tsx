import { LessonFlow } from "@/components/lesson/LessonFlow";
import { TOPICS } from "@/data/topics";
import { Topic } from "@/types";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.id }));
}

export default async function LessonPage({ params }: Props) {
  const { topic } = await params;
  const valid = TOPICS.find((t) => t.id === topic);
  if (!valid) notFound();
  return <LessonFlow topic={topic as Topic} />;
}