/* Kept so the older path still builds; it simply forwards to the shared /api/work/[col] handlers. Safe to delete this folder. */
import { GET as get, POST as post } from "../[col]/route";

const ctx = () => ({ params: Promise.resolve({ col: "jobs" }) });
export const GET = (req: Request) => get(req, ctx());
export const POST = (req: Request) => post(req, ctx());
