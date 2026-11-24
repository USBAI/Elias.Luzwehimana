import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/work/auth";
import { addJob, listJobs } from "@/lib/work/store";
import { cleanJob, type JobInput } from "@/lib/work/types";

const denied = () => NextResponse.json({ error: "Sign in first." }, { status: 401 });
const failed = (e: unknown) => { console.error(e); return NextResponse.json({ error: "Could not reach the database." }, { status: 500 }); };

export async function GET() {
  if (!(await isSignedIn())) return denied();
  try { return NextResponse.json({ jobs: await listJobs() }); } catch (e) { return failed(e); }
}

export async function POST(req: Request) {
  if (!(await isSignedIn())) return denied();
  const input = cleanJob(await req.json().catch(() => ({}))) as JobInput;
  if (!input.company || !input.role) return NextResponse.json({ error: "Company and role are required." }, { status: 400 });
  try { return NextResponse.json({ job: await addJob(input) }); } catch (e) { return failed(e); }
}
