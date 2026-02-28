import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { LessonProgress } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const progress: LessonProgress = await req.json();
    const docId = `${progress.studentId}_${progress.topic}`;
    await setDoc(doc(db, "progress", docId), {
      ...progress,
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");
  const topic = searchParams.get("topic");

  if (!studentId || !topic) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  try {
    const docId = `${studentId}_${topic}`;
    const snap = await getDoc(doc(db, "progress", docId));
    if (!snap.exists()) return NextResponse.json({ progress: null });
    return NextResponse.json({ progress: snap.data() });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}