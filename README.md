# Spacey Science 🚀

An AI-powered space education platform for children aged 8–14.

## Live Demo
[https://spacey-science-ruby.vercel.app/](https://spacey-science-ruby.vercel.app/)

## Path Chosen
**Path 2: The Intelligent Tutor (AI Architecture)**

## Tech Stack
- Next.js 15 (App Router, TypeScript)
- Groq API (llama-3.1-8b-instant) for AI tutoring
- Firebase Firestore for progress persistence
- Framer Motion for animations
- Tailwind CSS for styling

## How to Run Locally
1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and fill in your keys
4. Run `npm run dev`
5. Open http://localhost:3000

## Architecture Highlights
- **RAG Grounding**: Curated space facts injected into every prompt
  to prevent hallucinations
- **Streaming**: Responses stream token by token for snappy UX
- **Structured Output**: AI returns JSON for quiz generation
- **3-Step Flow**: Intro → AI Chat → Quiz with badge rewards
- **Persistence**: Progress saved to Firestore, survives page refresh

## Trade-offs
- Used keyword-based RAG retriever instead of vector DB for simplicity
- Groq/Llama instead of Gemini due to free tier quota limitations
- Single student ID instead of full auth (would use Firebase Auth in production)