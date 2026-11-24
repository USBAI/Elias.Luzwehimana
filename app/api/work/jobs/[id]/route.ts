import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/work/auth";
import { removeJob, updateJob } from "@/lib/work/store";
import { cleanJob } from "@/lib/work/types";

type Ctx = { params: Promise<{ id: string }> };
const denied = () => NextResponse.json({ error: "Sign in first." }, { status: 401 });
const failed = (e: unknown) => { console.error(e); return NextResponse.json({ error: "Could not reach the database." }, { status: 500 }); };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isSignedIn())) return denied();
  const patch = cleanJob(await req.json().catch(() => ({})), true);
  if (("company" in patch && !patch.company) || ("role" in patch && !patch.role)) return NextResponse.json({ error: "Company and role are required." }, { status: 400 });
  try {
    const job = await updateJob((await params).id, patch);
    return job ? NextResponse.json({ job }) : NextResponse.json({ error: "Not found." }, { status: 404 });
  } catch (e) { return failed(e); }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isSignedIn())) return denied();
  try {
    return (await removeJob((await params).id)) ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found." }, { status: 404 });
  } catch (e) { return failed(e); }
}
