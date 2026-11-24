import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/* One owner, one login. The email, password and signing secret live in environment
   variables (.env.local on your machine, Project Settings on Vercel), never in the code. */
const COOKIE = "work_session";
const DAYS = 30;
const secret = () => process.env.WORK_SECRET || `${process.env.WORK_PASSWORD}:${process.env.MONGODB_URI}`;
const sign = (value: string) => createHmac("sha256", secret()).update(value).digest("hex");
const same = (a: string, b: string) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export function checkLogin(email: string, password: string) {
  const e = process.env.WORK_EMAIL, p = process.env.WORK_PASSWORD;
  if (!e || !p) return false;
  return same(email.trim().toLowerCase(), e.toLowerCase()) && same(password, p);
}

export async function startSession() {
  const expires = Date.now() + DAYS * 864e5;
  (await cookies()).set(COOKIE, `${expires}.${sign(String(expires))}`, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: DAYS * 86400,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isSignedIn() {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [expires, mac] = raw.split(".");
  return !!expires && !!mac && Number(expires) > Date.now() && same(mac, sign(expires));
}
