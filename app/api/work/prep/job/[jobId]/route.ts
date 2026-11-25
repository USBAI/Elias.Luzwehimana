import { NextResponse } from "next/server";
import { isAllowed } from "@/lib/work/auth";
import { find, findBy, upsertBy } from "@/lib/work/store";
import { clean } from "@/lib/work/types";

/* Interview prep for one role.
   GET  /api/work/prep/job/<jobId>  → { job, item }   (item is null until something is written)
   PUT  /api/work/prep/job/<jobId>  → { item }        body: any of when, format, checklist, company, role,
                                                      people, pitch, questions, ask, logistics, after.
   Only the fields you send are changed. Add "append": true to add to the end of a section instead of replacing it.
   Same sign-in as the rest of /api/work: the session cookie, or "Authorization: Bearer <WORK_API_KEY>". */
type Ctx = { params: Promise<{ jobId: string }> };
const json = (body: unknown, status = 200) => NextResponse.json(body, { status });
const failed = (e: unknown) => { console.error(e); return json({ error: "Could not reach the database." }, 500); };

export async function GET(req: Request, { params }: Ctx) {
  const { jobId } = await params;
  if (!(await isAllowed(req))) return json({ error: "Sign in first." }, 401);
  try {
    const job = await find("jobs", jobId);
    if (!job) return json({ error: "No such role." }, 404);
    return json({ job, item: await findBy("prep", "jobId", jobId) });
  } catch (e) { return failed(e); }
}

export async function PUT(req: Request, { params }: Ctx) {
  const { jobId } = await params;
  if (!(await isAllowed(req))) return json({ error: "Sign in first." }, 401);
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return json({ error: "Nothing to save." }, 400);
  const append = body.append === true;
  const { data } = clean("prep", { ...body, jobId }, true);
  try {
    if (!(await find("jobs", jobId))) return json({ error: "No such role." }, 404);
    if (append) {
      const now = await findBy("prep", "jobId", jobId);
      for (const k of Object.keys(data)) if (k !== "jobId" && now?.[k]) data[k] = `${now[k]}\n\n${data[k]}`.slice(0, 20000);
    }
    return json({ item: await upsertBy("prep", "jobId", jobId, data) });
  } catch (e) { return failed(e); }
}
