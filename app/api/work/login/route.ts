import { NextResponse } from "next/server";
import { checkLogin, endSession, startSession } from "@/lib/work/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (!checkLogin(String(body.email ?? ""), String(body.password ?? ""))) {
    await new Promise((r) => setTimeout(r, 600)); // slows down guessing
    return NextResponse.json({ error: "Wrong email or password." }, { status: 401 });
  }
  await startSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await endSession();
  return NextResponse.json({ ok: true });
}
