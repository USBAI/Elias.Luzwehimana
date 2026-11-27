import type { Metadata } from "next";
import { isSignedIn } from "@/lib/work/auth";
import { list } from "@/lib/work/store";
import type { Contact, EmailLead, Job, Platform } from "@/lib/work/types";
import { Login } from "@/components/work/login";
import { Tracker } from "@/components/work/tracker";
import "./work.css";

export const metadata: Metadata = { title: "Work — Elias", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function WorkPage() {
  if (!(await isSignedIn())) return <div className="work"><Login /></div>;
  let jobs: Job[] = [], contacts: Contact[] = [], emails: EmailLead[] = [], platforms: Platform[] = [], error = "";
  try {
    [jobs, contacts, emails, platforms] = (await Promise.all([list("jobs"), list("contacts"), list("emails"), list("platforms")])) as unknown as [Job[], Contact[], EmailLead[], Platform[]];
  } catch (e) { console.error(e); error = "Could not reach the database. Check MONGODB_URI and Atlas network access."; }
  return <div className="work"><Tracker jobs={jobs} contacts={contacts} emails={emails} platforms={platforms} loadError={error} /></div>;
}
