import { NextResponse } from "next/server";
import { isAllowed } from "@/lib/work/auth";
import { remove, update } from "@/lib/work/store";
import { clean, isCol } from "@/lib/work/types";

type Ctx = { params: Promise<{ col: string; id: string }> };
const json = (body: unknown, status = 200) => NextResponse.json(body, { status });
const failed = (e: unknown) => { console.error(e); return json({ error: "Could not reach the database." }, 500); };

export async function PATCH(req: Request, { params }: Ctx) {
  const { col, id } = await params;
  if (!isCol(col)) return json({ error: "Unknown list." }, 404);
  if (!(await isAllowed(req))) return json({ error: "Sign in first." }, 401);
  const { data, error } = clean(col, await req.json().catch(() => null), true);
  if (error) return json({ error }, 400);
  try { const item = await update(col, id, data); return item ? json({ item }) : json({ error: "Not found." }, 404); } catch (e) { return failed(e); }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const { col, id } = await params;
  if (!isCol(col)) return json({ error: "Unknown list." }, 404);
  if (!(await isAllowed(req))) return json({ error: "Sign in first." }, 401);
  try { return (await remove(col, id)) ? json({ ok: true }) : json({ error: "Not found." }, 404); } catch (e) { return failed(e); }
}
