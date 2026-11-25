import { MongoClient, ObjectId, type Collection, type Document } from "mongodb";
import { DEFAULT_PLATFORMS, type Col } from "./types";

/* Everything lives in MongoDB Atlas, database "work", one collection per list.
   Without MONGODB_URI (local dev only) the lists are kept in memory so the page still runs. */
export type Item = { id: string; createdAt: string; updatedAt: string } & Record<string, string>;
type Doc = Document & { _id: ObjectId };
const g = globalThis as unknown as { _workClient?: Promise<MongoClient>; _workMemory?: Record<string, Item[]> };

async function collection(col: Col): Promise<Collection<Doc> | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    if (process.env.NODE_ENV === "production" && !process.env.WORK_ALLOW_MEMORY) throw new Error("MONGODB_URI is not set");
    return null;
  }
  g._workClient ??= new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect().catch((e) => { g._workClient = undefined; throw e; });
  return (await g._workClient).db(process.env.MONGODB_DB || "work").collection<Doc>(col);
}
const memory = (col: Col) => ((g._workMemory ??= {})[col] ??= []);
const out = ({ _id, ...rest }: Doc) => ({ id: _id.toHexString(), ...rest }) as Item;
const oid = (id: string) => (ObjectId.isValid(id) ? new ObjectId(id) : null);
const stamp = () => new Date().toISOString();

export async function list(col: Col): Promise<Item[]> {
  const c = await collection(col);
  let items = c ? (await c.find().sort({ updatedAt: -1 }).limit(2000).toArray()).map(out) : [...memory(col)];
  if (col === "platforms" && items.length === 0) { items = await addMany(col, DEFAULT_PLATFORMS); return items; }
  return c ? items : items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function addMany(col: Col, inputs: Record<string, string>[]): Promise<Item[]> {
  const base = Date.now();
  // Slightly different timestamps keep the given order when sorted newest first.
  const docs = inputs.map((input, i) => { const t = new Date(base - i).toISOString(); return { _id: new ObjectId(), ...input, createdAt: t, updatedAt: t }; });
  const c = await collection(col);
  if (c) await c.insertMany(docs); else memory(col).push(...docs.map(out));
  return docs.map(out);
}
export const add = async (col: Col, input: Record<string, string>) => (await addMany(col, [input]))[0];

export async function update(col: Col, id: string, patch: Record<string, string>): Promise<Item | null> {
  const set = { ...patch, updatedAt: stamp() };
  const c = await collection(col);
  if (!c) { const item = memory(col).find((j) => j.id === id); if (!item) return null; Object.assign(item, set); return item; }
  const _id = oid(id); if (!_id) return null;
  const doc = await c.findOneAndUpdate({ _id }, { $set: set }, { returnDocument: "after" });
  return doc ? out(doc) : null;
}

export async function remove(col: Col, id: string): Promise<boolean> {
  const c = await collection(col);
  if (!c) { const m = memory(col), i = m.findIndex((j) => j.id === id); if (i < 0) return false; m.splice(i, 1); return true; }
  const _id = oid(id); if (!_id) return false;
  return (await c.deleteOne({ _id })).deletedCount === 1;
}

export async function find(col: Col, id: string): Promise<Item | null> {
  const c = await collection(col);
  if (!c) return memory(col).find((j) => j.id === id) ?? null;
  const _id = oid(id); if (!_id) return null;
  const doc = await c.findOne({ _id });
  return doc ? out(doc) : null;
}

/* One document per value of `key` (interview prep is one per role): update it, or create it the first time. */
export async function findBy(col: Col, key: string, value: string): Promise<Item | null> {
  const c = await collection(col);
  if (!c) return memory(col).find((j) => j[key] === value) ?? null;
  const doc = await c.findOne({ [key]: value });
  return doc ? out(doc) : null;
}
export async function upsertBy(col: Col, key: string, value: string, patch: Record<string, string>): Promise<Item> {
  const existing = await findBy(col, key, value);
  if (existing) return (await update(col, existing.id, patch)) ?? existing;
  return add(col, { ...patch, [key]: value });
}
