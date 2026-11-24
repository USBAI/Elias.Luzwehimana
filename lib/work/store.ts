import { MongoClient, ObjectId, type Collection } from "mongodb";
import type { Job, JobInput } from "./types";

/* Jobs live in MongoDB Atlas (database "work", collection "jobs").
   Without MONGODB_URI (local dev only) they are kept in memory so the page still runs. */
type Doc = Omit<Job, "id"> & { _id: ObjectId };
const g = globalThis as unknown as { _workClient?: Promise<MongoClient>; _workMemory?: Job[] };

async function jobs(): Promise<Collection<Doc> | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    if (process.env.NODE_ENV === "production" && !process.env.WORK_ALLOW_MEMORY) throw new Error("MONGODB_URI is not set");
    return null;
  }
  g._workClient ??= new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect().catch((e) => { g._workClient = undefined; throw e; });
  return (await g._workClient).db(process.env.MONGODB_DB || "work").collection<Doc>("jobs");
}
const memory = () => (g._workMemory ??= []);
const out = ({ _id, ...rest }: Doc): Job => ({ id: _id.toHexString(), ...rest });
const oid = (id: string) => (ObjectId.isValid(id) ? new ObjectId(id) : null);

export async function listJobs(): Promise<Job[]> {
  const c = await jobs();
  if (!c) return [...memory()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return (await c.find().sort({ updatedAt: -1 }).limit(2000).toArray()).map(out);
}

export async function addJob(input: JobInput): Promise<Job> {
  const now = new Date().toISOString();
  const c = await jobs();
  if (!c) { const job = { id: new ObjectId().toHexString(), ...input, createdAt: now, updatedAt: now }; memory().push(job); return job; }
  const doc = { _id: new ObjectId(), ...input, createdAt: now, updatedAt: now };
  await c.insertOne(doc);
  return out(doc);
}

export async function updateJob(id: string, patch: Partial<JobInput>): Promise<Job | null> {
  const set = { ...patch, updatedAt: new Date().toISOString() };
  const c = await jobs();
  if (!c) { const job = memory().find((j) => j.id === id); if (!job) return null; Object.assign(job, set); return job; }
  const _id = oid(id); if (!_id) return null;
  const doc = await c.findOneAndUpdate({ _id }, { $set: set }, { returnDocument: "after" });
  return doc ? out(doc) : null;
}

export async function removeJob(id: string): Promise<boolean> {
  const c = await jobs();
  if (!c) { const m = memory(), i = m.findIndex((j) => j.id === id); if (i < 0) return false; m.splice(i, 1); return true; }
  const _id = oid(id); if (!_id) return false;
  return (await c.deleteOne({ _id })).deletedCount === 1;
}
