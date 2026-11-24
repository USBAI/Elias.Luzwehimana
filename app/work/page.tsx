import type { Metadata } from "next";
import { isSignedIn } from "@/lib/work/auth";
import { listJobs } from "@/lib/work/store";
import type { Job } from "@/lib/work/types";
import { Login } from "@/components/work/login";
import { Tracker } from "@/components/work/tracker";
import "./work.css";

export const metadata: Metadata = { title: "Work — Elias", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function WorkPage() {
  if (!(await isSignedIn())) return <div className="work"><Login /></div>;
  let jobs: Job[] = [], error = "";
  try { jobs = await listJobs(); } catch (e) { console.error(e); error = "Could not reach the database. Check MONGODB_URI and Atlas network access."; }
  return <div className="work"><Tracker initial={jobs} loadError={error} /></div>;
}
