import { NextResponse } from "next/server";
import { isAllowed } from "@/lib/work/auth";
import { addMany, list } from "@/lib/work/store";
import { clean, isCol } from "@/lib/work/types";

/* /api/work/jobs · /api/work/contacts · /api/work/platforms
   GET lists everything. POST adds one item, or many when the body is an array. */
type Ctx = { params: Promise<{ col: string }> };
const json = (body: unknown, status = 200) => NextResponse.json(body, { status });
const failed = (e: unknown) => { console.error(e); return json({ error: "Could not reach the database." }, 500); };

export async function GET(req: Request, { params }: Ctx) {
  const { col } = await params;
  if (!isCol(col)) return json({ error: "Unknown list." }, 404);
  if (!(await isAllowed(req))) return json({ error: "Sign in first." }, 401);
  try { return json({ items: await list(col) }); } catch (e) { return failed(e); }
}

export async function POST(req: Request, { params }: Ctx) {
  const { col } = await params;
  if (!isCol(col)) return json({ error: "Unknown list." }, 404);
  if (!(await isAllowed(req))) return json({ error: "Sign in first." }, 401);
  const body = await req.json().catch(() => null);
  const many = Array.isArray(body);
  const inputs = (many ? body : [body]).slice(0, 200).map((b: unknown) => clean(col, b));
  const bad = inputs.find((i) => i.error);
  if (bad || inputs.length === 0) return json({ error: bad?.error ?? "Nothing to add." }, 400);
  try {
    const items = await addMany(col, inputs.map((i) => i.data));
    return json(many ? { items } : { item: items[0] });
  } catch (e) { return failed(e); }
}
