import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isSignedIn } from "@/lib/work/auth";
import { find, findBy } from "@/lib/work/store";
import type { Job, Prep as PrepDoc } from "@/lib/work/types";
import { Login } from "@/components/work/login";
import { Prep } from "@/components/work/prep";
import "../../work.css";

export const metadata: Metadata = { title: "Interview prep — Elias", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function InterviewPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isSignedIn())) return <div className="work"><Login /></div>;
  const { id } = await params;
  const job = (await find("jobs", id)) as unknown as Job | null;
  if (!job) notFound();
  const prep = (await findBy("prep", "jobId", id)) as unknown as PrepDoc | null;
  return <div className="work"><Prep job={job} prep={prep} /></div>;
}
