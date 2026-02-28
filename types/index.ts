export type Topic = "moon" | "mars" | "sun" | "blackholes" | "iss";

export interface Message {
  role: "user" | "assistant";
  content: string;
  toolUse?: ToolUseEvent[];
}

export interface ToolUseEvent {
  name: string;
  input: Record<string, unknown>;
}

export interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonProgress {
  studentId: string;
  topic: Topic;
  step: "intro" | "interaction" | "quiz" | "complete";
  score: number | null;
  badge: string | null;
  completedAt: string | null;
  chatHistory: Message[];
}

export interface StreamChunk {
  type: "text_delta" | "tool_use" | "done";
  content?: string;
  toolName?: string;
  toolInput?: Record<string, unknown>;
}