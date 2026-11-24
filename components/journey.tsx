"use client";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { education, experience, method, nextRoles, nextTeam, person, pitch, projects, security, slides, stack, work, type Work } from "@/lib/content";
import { useStory } from "./story";
import { Logo } from "./logo";


type ChapterId = "hero" | "work" | "education" | "projects" | "method" | "security" | "experience" | "next" | "stack" | "contact";
const CHAPTERS: { id: ChapterId; label: string; count: number }[] = [
  { id: "hero", label: "Start", count: 1 },
  { id: "work", label: "Work", count: work.length },
  { id: "education", label: "Studies", count: education.length },
  { id: "projects", label: "Projects", count: projects.length },
  { id: "method", label: "How I work", count: method.length },
  { id: "security", label: "Security", count: security.length },
  { id: "experience", label: "Experience", count: 1 },
  { id: "next", label: "What's next", count: nextRoles.length + 1 },
  { id: "stack", label: "Stack", count: 1 },
  { id: "contact", label: "Contact", count: 1 },
];
const STEPS = CHAPTERS.flatMap((c, ci) => Array.from({ length: c.count }, (_, k) => ({ ci, k })));
const firstStep = (ci: number) => STEPS.findIndex((s) => s.ci === ci);
const pad = (n: number) => String(n).padStart(2, "0");
const state = (i: number, cur: number) => (i < cur ? "past" : i === cur ? "current" : "future");

/* Find a scrollable ancestor that can still scroll in the given direction. */
function canScroll(target: EventTarget | null, dir: number) {
  let el = target instanceof Element ? (target as HTMLElement) : null;
  while (el && !el.classList?.contains("stage")) {
    const style = getComputedStyle(el);
    if (/(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 2) {
      if (dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0) return true;
    }
    el = el.parentElement;
  }
  return false;
}

/* ---------- Top pill: menu toggle (hero only) joined with availability ---------- */
function PillBar({ tone, showMenu, current, onJump }: { tone: "dark" | "light"; showMenu: boolean; current: number; onJump: (ci: number) => void }) {
  const [open, setOpen] = useState<"menu" | "contact" | null>(null);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!showMenu && open === "menu") setOpen(null); }, [showMenu, open]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(null); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onDown); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(person.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };
  const toggle = (which: "menu" | "contact") => setOpen((o) => (o === which ? null : which));

  return (
    <div className="pillbar" ref={ref} data-tone={tone} data-menu={showMenu}>
      <div className="pill-group">
        <button className="pill-seg pill-menu" aria-expanded={open === "menu"} onClick={() => toggle("menu")} tabIndex={showMenu ? 0 : -1} aria-hidden={!showMenu}>
          <span className="burger" data-open={open === "menu"}><i /><i /></span>
          Menu
        </button>
        <span className="pill-divider" aria-hidden />
        <button className="pill-seg" aria-expanded={open === "contact"} onClick={() => toggle("contact")}>
          <span className="dot" aria-hidden />
          {person.availability}
          <svg className="chev" data-open={open === "contact"} viewBox="0 0 12 12" width="11" height="11" aria-hidden><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div className="pill-panel" data-open={open === "menu"} aria-hidden={open !== "menu"} inert={open !== "menu"}>
        {CHAPTERS.map((c, i) => (
          <button key={c.id} className="menu-row" data-current={i === current} aria-current={i === current ? "step" : undefined} onClick={() => { setOpen(null); onJump(i); }}>
            <span>{pad(i)}</span><b>{c.label}</b><em>{i === current ? "You are here" : c.count > 1 ? `${c.count} parts` : ""}</em>
          </button>
        ))}
      </div>
      <div className="pill-panel" data-open={open === "contact"} aria-hidden={open !== "contact"} inert={open !== "contact"}>
        <button className="contact-row" onClick={copy}><span>Email</span><b>{copied ? "Copied" : person.email}</b></button>
        <a className="contact-row" href={person.phoneHref}><span>Phone</span><b>{person.phone}</b></a>
        <a className="contact-row" href={person.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><b>Profile ↗</b></a>
        <a className="contact-row" href={person.github} target="_blank" rel="noreferrer"><span>GitHub</span><b>USBAI ↗</b></a>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */

const Hero = memo(function Hero({ active, onStart }: { active: boolean; onStart: () => void }) {
  const [index, setIndex] = useState(0);
  const { open, isOpen } = useStory();
  const startX = useRef<number | null>(null);
  const count = slides.length;
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const [hold, setHold] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useEffect(() => { if (!isOpen) setHold(false); }, [isOpen, active]);
  useEffect(() => {
    if (!active || isOpen || hold || reduce) return;
    const id = setTimeout(() => go(index + 1), 6000);
    return () => clearTimeout(id);
  }, [index, active, isOpen, hold, reduce, go]);

  const slide = slides[index];

  return (
    <div className="hero" data-active={active}
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)} onBlurCapture={() => setHold(false)}
      onPointerDown={(e) => { startX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current; startX.current = null;
        if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
      }}>
      <div className="hero-strip" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div className="hero-frame" key={s.src} data-active={i === index} aria-hidden={i !== index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.alt} draggable={false} style={{ "--pos": s.position ?? "50% 50%", "--pos-m": s.mobilePosition ?? s.position ?? "50% 50%" } as React.CSSProperties} fetchPriority={i === 0 ? "high" : "low"} />
          </div>
        ))}
      </div>
      <div className="hero-shade" aria-hidden />

      <div className="hero-copy">
        <h1 className="hero-name">Elias <em>Luzwehimana</em></h1>
        <p className="hero-line">Senior engineer · AI &amp; product · Stockholm</p>
        <div className="hero-caption" key={slide.label}>
          <span>{pad(index + 1)} / {pad(count)}</span>
          <b>{slide.label}</b>
          <button onClick={() => open(`moment-${slide.label}`)}>Read more <i aria-hidden>→</i></button>
        </div>
      </div>

      <div className="hero-dots">
        {slides.map((s, i) => (
          <button key={s.src} aria-label={`Show ${s.label}`} data-active={i === index} onClick={() => go(i)}>
            <i style={{ animationDuration: hold || reduce ? "0s" : "6s" }} key={i === index ? `a${index}` : "x"} />
          </button>
        ))}
      </div>
      <button className="hero-start" onClick={onStart}>See my work <span aria-hidden>↓</span></button>
    </div>
  );
});

/* Position of item j: in view, waiting on the right, or tucked away on the left. */
function itemStyle(j: number, k: number, _d?: number): React.CSSProperties {
  const rel = j - k;
  return {
    transform: rel > 0 ? "translate3d(102%,0,0)" : rel < 0 ? "translate3d(-22%,0,0)" : "none",
    opacity: rel < 0 ? 0 : 1,
    zIndex: 10 + j,
    pointerEvents: rel === 0 ? "auto" : "none",
  };
}

/* ---------- Chapter content ---------- */
/* Profile header: a framed photo and the logo; the layout places them beside the text. */
function ProfileHead({ banner, logo, name, mark, partner }: { banner?: { src: string; position?: string; credit?: string }; logo?: string; name: string; mark?: string; partner?: { logo: string; name: string; note: string } }) {
  return (
    <>
      <figure className="banner">
        {banner && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={banner.src} alt="" style={{ objectPosition: banner.position }} draggable={false} />
        )}
        {banner?.credit && <figcaption>{banner.credit}</figcaption>}
      </figure>
      <div className="avatar-row">
        <Logo src={logo} mark={mark} name={name} />
        {partner && (<><span className="logo-x">{partner.note}</span><Logo src={partner.logo} name={partner.name} /></>)}
      </div>
    </>
  );
}

function MetaCard({ rows, tags }: { rows?: [string, string][]; tags?: string[] }) {
  return (
    <aside className="item-card">
      {rows && <dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
      {tags && <ul className="tags">{tags.map((t) => <li key={t}>{t}</li>)}</ul>}
    </aside>
  );
}

const WorkChapter = memo(function WorkChapter({ k, d, items, prefix }: { k: number; d: number; items: Work[]; prefix: string }) {
  const { open } = useStory();
  return (
    <>
      {items.map((w, j) => (
        <article key={w.name} className="item item-page item-profile" style={itemStyle(j, k, d)} aria-hidden={j !== k} inert={j !== k}>
          <div className="splash" aria-hidden><i /><i /><i /></div>
          <ProfileHead banner={w.banner} logo={w.logo} mark={w.mark} name={w.name} partner={w.partner} />
          <div className="profile-body">
          <div className="item-main">
            <p className="eyebrow">{w.type}{w.status ? <span className="chip">{w.status}</span> : null}</p>
            {w.role ? (<><h2 className="role-title">{w.role}</h2><p className="role-project">{w.name}</p></>) : <h2>{w.name}</h2>}
            <p className="lead">{w.summary}</p>
            {w.facts && <ul className="facts">{w.facts.map((f) => <li key={f}>{f}</li>)}</ul>}
            <div className="item-actions">
              <button className="btn btn-dark" tabIndex={j === k ? 0 : -1} onClick={() => open(`${prefix}-${w.name}`)}>Read the full story <span aria-hidden>→</span></button>
              {w.href && <a className="text-link" tabIndex={j === k ? 0 : -1} href={w.href} target="_blank" rel="noreferrer">{w.href.replace("https://", "")} ↗</a>}
            </div>
          </div>
          </div>
        </article>
      ))}
    </>
  );
});

const EducationChapter = memo(function EducationChapter({ k, d }: { k: number; d: number }) {
  const { open } = useStory();
  return (
    <>
      {education.map((e, j) => (
        <article key={e.school} className="item item-page item-profile" style={itemStyle(j, k, d)} aria-hidden={j !== k} inert={j !== k}>
          <div className="splash" aria-hidden><i /><i /><i /></div>
          <ProfileHead banner={e.banner} logo={e.logo} mark={e.mark} name={e.school} />
          <div className="profile-body">
          <div className="item-main">
            <p className="eyebrow">{e.what} · {e.period}</p>
            <h2>{e.school}</h2>
            <p className="lead">{e.text}</p>
            <div className="item-actions">
              <button className="btn btn-dark" tabIndex={j === k ? 0 : -1} onClick={() => open(`study-${e.school}`)}>Read the full story <span aria-hidden>→</span></button>
            </div>
          </div>
          </div>
        </article>
      ))}
    </>
  );
});

const MethodChapter = memo(function MethodChapter({ k, d }: { k: number; d: number }) {
  return (
    <>
      {method.map((m, j) => (
        <article key={m.name} className="item item-page item-method" style={itemStyle(j, k, d)} aria-hidden={j !== k} inert={j !== k}>
          <div className="splash" aria-hidden><i /><i /><i /></div>
          <div className="item-main">
            <p className="method-steps">
              {method.map((x, n) => <span key={x.name} data-active={n === j} data-done={n < j}>{x.name}</span>)}
            </p>
            <p className="method-n">{m.n}</p>
            <h2>{m.title}</h2>
            <p className="lead">{m.text}</p>
          </div>
          <aside className="item-card method-card">
            <p className="card-label">You get</p>
            <p className="method-output">{m.output}</p>
            <dl>
              <div><dt>I bring</dt><dd>{m.me}</dd></div>
              <div><dt>The team brings</dt><dd>{m.team}</dd></div>
            </dl>
          </aside>
        </article>
      ))}
    </>
  );
});

const SecurityChapter = memo(function SecurityChapter({ k, d }: { k: number; d: number }) {
  const { open } = useStory();
  return (
    <>
      {security.map((x, j) => (
        <article key={x.name} className="item item-page" style={itemStyle(j, k, d)} aria-hidden={j !== k} inert={j !== k}>
          <div className="splash" aria-hidden><i /><i /><i /></div>
          <div className="item-main">
            <Logo src={x.logo ?? "/logos/shield.svg"} name={x.logo ? "Försvarshögskolan" : "Security"} />
            <p className="eyebrow">{x.kicker}</p>
            <h2>{x.name}</h2>
            <p className="lead">{x.summary}</p>
            <div className="item-actions">
              <button className="btn btn-dark" tabIndex={j === k ? 0 : -1} onClick={() => open(`security-${x.name}`)}>Read more</button>
              {x.link && <a className="text-link" tabIndex={j === k ? 0 : -1} href={x.link.href} target="_blank" rel="noreferrer">{x.link.label} ↗</a>}
            </div>
          </div>
          {x.points ? (
            <aside className="item-card points-card">
              {x.points.map(([t, v]) => <div key={t}><h4>{t}</h4><p>{v}</p></div>)}
            </aside>
          ) : x.image ? (
            <button className="cert" tabIndex={j === k ? 0 : -1} onClick={() => open(`security-${x.name}`)} aria-label="Open the security protection certificate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={x.image} alt="Participation certificate: Grundläggande säkerhetsskyddsutbildning, Elias Luzwehimana, 20 June 2025, Försvarshögskolan and MSB" />
              <span className="cert-tag">Participation certificate · 20 June 2025</span>
            </button>
          ) : <MetaCard rows={x.meta} />}
        </article>
      ))}
    </>
  );
});

const NextChapter = memo(function NextChapter({ k, d }: { k: number; d: number }) {
  return (
    <>
      {nextRoles.map((r, j) => (
        <article key={r.role} className="item item-page item-next" style={itemStyle(j, k, d)} aria-hidden={j !== k} inert={j !== k}>
          <div className="splash" aria-hidden><i /><i /><i /></div>
          <div className="item-main">
            <p className="method-steps">
              {nextRoles.map((x, n) => <span key={x.role} data-active={n === j} data-done={n < j}>{x.role}</span>)}
            </p>
            <p className="eyebrow">What I&apos;m looking for next</p>
            <h2>{r.role}</h2>
            <p className="next-why"><b>Why</b>{r.why}</p>
            <p className="next-fit">{r.fit}</p>
          </div>
          <aside className="item-card proof-card">
            <p className="card-label">The evidence</p>
            {r.proof.map(([where, what]) => <div key={where}><h4>{where}</h4><p>{what}</p></div>)}
          </aside>
        </article>
      ))}
      <article className="item item-page item-next" style={itemStyle(nextRoles.length, k, d)} aria-hidden={k !== nextRoles.length} inert={k !== nextRoles.length}>
        <div className="splash" aria-hidden><i /><i /><i /></div>
        <div className="item-main">
          <p className="eyebrow">What I&apos;m looking for next</p>
          <h2>{nextTeam.title}</h2>
          <p className="lead">Senior Engineer, Product Engineer or Founding Engineer, in a team where engineers own outcomes.</p>
        </div>
        <aside className="item-card points-card">
          {nextTeam.points.map(([t, v]) => <div key={t}><h4>{t}</h4><p>{v}</p></div>)}
        </aside>
      </article>
    </>
  );
});

const ExperienceChapter = memo(function ExperienceChapter() {
  return (
    <article className="item item-wide" data-state="current">
      <h2 className="chapter-title">Experience</h2>
      <ol className="roles">
        {experience.map((r) => (
          <li key={r.company + r.title}>
            <span className="role-period">{r.period}</span>
            <span className="role-company"><Logo src={r.logo} mark={r.mark} name={r.company} size="sm" />{r.company}</span>
            <span className="role-title">{r.title}<small>{r.text}</small></span>
          </li>
        ))}
      </ol>
    </article>
  );
});

const StackChapter = memo(function StackChapter() {
  return (
    <article className="item item-wide" data-state="current">
      <h2 className="chapter-title">Stack</h2>
      <div className="stack-groups">
        {stack.map(([group, items]) => (
          <div key={group} className="stack-group">
            <h4>{group}</h4>
            <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </article>
  );
});

const ContactChapter = memo(function ContactChapter() {
  return (
    <article className="item item-contact" data-state="current">
      <div>
        <h2>Let&apos;s <em>talk.</em></h2>
        <ul className="pitch">
          {pitch.map(([t, v]) => <li key={t}><b>{t}</b><span>{v}</span></li>)}
        </ul>
      </div>
      <div className="contact-side">
        <p>I&apos;m looking for a senior, founding or product engineering role. Email is the fastest way to reach me.</p>
        <a className="btn btn-black" href={`mailto:${person.email}`}>{person.email}</a>
        <div className="contact-links">
          <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={person.phoneHref}>{person.phone}</a>
        </div>
      </div>
      <p className="footnote">© {new Date().getFullYear()} Elias Luzwehimana · Stockholm</p>
    </article>
  );
});

/* ---------- Journey: a guided path, forward or back ---------- */
export function Journey() {
  const [step, setStep] = useState(0);
  const { isOpen } = useStory();
  const stepRef = useRef(0);
  const blocked = useRef(false);
  stepRef.current = step;
  blocked.current = isOpen;

  const { ci, k } = STEPS[step];
  const chapter = CHAPTERS[ci];

  const move = useCallback((d: number) => {
    setStep((s) => Math.min(STEPS.length - 1, Math.max(0, s + d)));
  }, []);

  /* One deliberate scroll turns one page, straight away. No scroll-following: the browser
     runs the page turn as a single composited CSS transition, so it stays smooth. */
  useEffect(() => {
    const THRESHOLD = 46;   // px of scroll intent before the page turns
    const LOCK = 620;       // ms: one page per gesture
    const GAP = 130;        // ms of silence that ends a trackpad gesture
    let acc = 0, lastT = 0, lockUntil = 0, armed = true, low = 0;
    let touchY = 0, touchSum = 0, touchTurned = false;
    const turn = (dir: number) => {
      const n = stepRef.current + dir;
      if (n < 0 || n >= STEPS.length) return;
      stepRef.current = n; setStep(n);
    };
    const onWheel = (e: WheelEvent) => {
      if (blocked.current) return;
      const dy = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : 0;
      if (!dy || canScroll(e.target, dy)) return;
      const t = performance.now(), abs = Math.abs(dy);
      const notch = e.deltaMode === 1 || (abs >= 60 && Number.isInteger(dy));
      if (t - lastT > GAP) { acc = 0; armed = true; }
      lastT = t;
      if (t < lockUntil) { low = abs; return; }
      if (!armed) {
        // Still the momentum tail of the last swipe: ignore it, unless a clearly new push begins.
        low = Math.min(low, abs);
        if (notch || abs > low + 28) { armed = true; acc = 0; } else return;
      }
      // For a moment after a turn, faint events are the old swipe's momentum, not a new intent.
      if (!notch && t < lockUntil + 700 && abs < 9) return;
      acc = Math.sign(acc) === Math.sign(dy) ? acc + dy : dy;
      if (notch || Math.abs(acc) >= THRESHOLD) {
        turn(Math.sign(dy)); acc = 0; armed = false; low = abs; lockUntil = t + LOCK;
      }
    };
    let touchTarget: EventTarget | null = null;
    let scrolledInside = false;
    const onStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; touchTarget = e.target; touchSum = 0; touchTurned = false; scrolledInside = false; };
    const onMove = (e: TouchEvent) => {
      if (blocked.current || touchTurned) return;
      const y = e.touches[0].clientY, dy = touchY - y;
      touchY = y;
      if (!dy) return;
      // Long pages scroll natively. A swipe that scrolled a page never also turns it: the next one does.
      if (scrolledInside || canScroll(touchTarget, dy)) { scrolledInside = true; return; }
      touchSum += dy;
      if (Math.abs(touchSum) >= 56) { touchTurned = true; turn(Math.sign(touchSum)); }
    };
    const onKey = (e: KeyboardEvent) => {
      if (blocked.current) return;
      const t = e.target as HTMLElement;
      if (t && /INPUT|TEXTAREA/.test(t.tagName)) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); move(1); }
      if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); move(-1); }
      if (e.key === "Home") setStep(0);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [move]);

  // A long page you arrive at starts at its top when moving forward, at its end when coming back.
  const prevStep = useRef(0);
  const jumped = useRef(false);
  useEffect(() => {
    const forward = jumped.current || step >= prevStep.current; prevStep.current = step; jumped.current = false;
    const el = document.querySelector<HTMLElement>('.chapter[data-state="current"] .item[aria-hidden="false"], .chapter[data-state="current"] .item-wide, .chapter[data-state="current"] .item-contact');
    if (el) el.scrollTop = forward ? 0 : el.scrollHeight;
  }, [step]);

  const startWork = useCallback(() => setStep(1), []);

  const itemIndex = (i: number) => (i === ci ? k : i < ci ? CHAPTERS[i].count - 1 : 0);

  return (
    <div className="stage" data-chapter={chapter.id}>
      {CHAPTERS.map((c, i) => (
        <section key={c.id} className={`chapter chapter-${c.id}`} data-state={state(i, ci)} data-near={Math.abs(i - ci) <= 1} aria-hidden={i !== ci} inert={i !== ci || isOpen} aria-label={c.label}>
          {c.id !== "hero" && c.id !== "contact" && <div className="splash" aria-hidden><i /><i /><i /></div>}
          {c.id === "hero" && <Hero active={ci === 0} onStart={startWork} />}
          {c.id === "work" && <WorkChapter k={itemIndex(i)} d={0} items={work} prefix="work" />}
          {c.id === "projects" && <WorkChapter k={itemIndex(i)} d={0} items={projects} prefix="project" />}
          {c.id === "education" && <EducationChapter k={itemIndex(i)} d={0} />}
          {c.id === "method" && <MethodChapter k={itemIndex(i)} d={0} />}
          {c.id === "security" && <SecurityChapter k={itemIndex(i)} d={0} />}
          {c.id === "experience" && <ExperienceChapter />}
          {c.id === "next" && <NextChapter k={itemIndex(i)} d={0} />}
          {c.id === "stack" && <StackChapter />}
          {c.id === "contact" && <ContactChapter />}
        </section>
      ))}

      <div inert={isOpen}><PillBar tone={ci === 0 ? "dark" : "light"} showMenu current={ci} onJump={(target) => { jumped.current = true; setStep(firstStep(target)); }} /></div>

      <nav className="pager" inert={isOpen || ci === 0} data-visible={ci > 0} data-tone={chapter.id === "contact" ? "lime" : "light"} aria-label="Progress">
        <div className="pager-label">
          <b>{chapter.label}</b>
          {chapter.count > 1 && <span>{pad(k + 1)} / {pad(chapter.count)}</span>}
        </div>
        {chapter.count > 1 && (
          <div className="pager-dots">
            {Array.from({ length: chapter.count }, (_, j) => (
              <button key={j} data-active={j === k} aria-label={`${chapter.label} ${j + 1}`} onClick={() => setStep(firstStep(ci) + j)} />
            ))}
          </div>
        )}
        <div className="pager-arrows">
          <button onClick={() => move(-1)} aria-label="Previous">←</button>
          <button onClick={() => move(1)} aria-label="Next" disabled={step === STEPS.length - 1}>→</button>
        </div>
      </nav>
    </div>
  );
}
