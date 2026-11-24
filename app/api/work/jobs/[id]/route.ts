/* Forwards to the shared /api/work/[col]/[id] handlers. Safe to delete this folder. */
import { DELETE as del, PATCH as patch } from "../../[col]/[id]/route";

type Ctx = { params: Promise<{ id: string }> };
const ctx = async ({ params }: Ctx) => ({ params: Promise.resolve({ col: "jobs", id: (await params).id }) });
export const PATCH = async (req: Request, c: Ctx) => patch(req, await ctx(c));
export const DELETE = async (req: Request, c: Ctx) => del(req, await ctx(c));
