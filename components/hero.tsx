"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { person, slides, stats } from "@/lib/content";
import { useStory } from "./story";

const DURATION = 7000;

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(value); return; }
    let raf = 0; const start = performance.now() + 500;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / 1400));
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n}{suffix}</>;
}

function StockholmClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Stockholm" });
    const update = () => setTime(f.format(new Date()));
    update(); const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="hero-clock" suppressHydrationWarning>Stockholm <b>{time}</b></span>;
}

function Banner() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(person.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };
  return (
    <div className="banner" ref={ref} data-open={open}>
      <button className="banner-pill" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="pulse" aria-hidden />
        <span className="banner-text">{person.availability}</span>
        <span className="banner-short">Available now</span>
        <svg className="chev" viewBox="0 0 12 12" width="12" height="12" aria-hidden><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
      <div className="banner-panel" role="menu" aria-hidden={!open}>
        <p className="banner-note">Looking for my next team. I'm ready to start immediately and can work hybrid, on-site or remote.</p>
        <button className="banner-row" onClick={copy}>
          <span>Email</span><b>{copied ? "Copied ✓" : person.email}</b>
        </button>
        <a className="banner-row" href={person.phoneHref}><span>Phone</span><b>{person.phone}</b></a>
        <a className="banner-row" href={person.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><b>Profile ↗</b></a>
        <a className="banner-row" href={person.github} target="_blank" rel="noreferrer"><span>GitHub</span><b>USBAI ↗</b></a>
        <a className="btn btn-lime banner-cta" href={`mailto:${person.email}?subject=Role%20at%20`} onClick={() => setOpen(false)}>Start a conversation</a>
      </div>
    </div>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { open, isOpen } = useStory();
  const startX = useRef<number | null>(null);
  const count = slides.length;
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const holding = paused || isOpen;

  useEffect(() => {
    if (holding) return;
    const id = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(id);
  }, [index, holding, go]);

  const slide = slides[index];
  const onDown = (e: React.PointerEvent) => { if (e.pointerType !== "mouse") startX.current = e.clientX; };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current; startX.current = null;
    if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-frame" onPointerDown={onDown} onPointerUp={onUp}
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(index + 1); if (e.key === "ArrowLeft") go(index - 1); }}>
        <div className="hero-ambient" aria-hidden>
          {slides.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s.src} src={s.src} alt="" data-active={i === index} />
          ))}
        </div>
        <div className="hero-media">
          {slides.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s.src} src={s.src} alt={s.alt} data-active={i === index} style={{ objectPosition: s.position }}
              fetchPriority={i === 0 ? "high" : "low"} draggable={false} />
          ))}
        </div>
        <div className="hero-shade" aria-hidden />

        <div className="hero-top">
          <a href="#top" className="mark" aria-label="Elias Luzwehimana">El</a>
          <Banner />
          <StockholmClock />
        </div>

        <div className="hero-content">
          <p className="eyebrow"><span className="dash" />{person.role}</p>
          <h1>
            <span className="h1-first">{person.name}</span>
            <em>{person.surname}</em>
          </h1>
          <p className="hero-summary">{person.summary}</p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-lime">See selected work</a>
            <a href="#contact" className="btn btn-glass">Get in touch</a>
          </div>
          <dl className="hero-stats">
            {stats.map((s) => (
              <div key={s.label}><dt><Counter value={s.value} suffix={s.suffix} /></dt><dd>{s.label}</dd></div>
            ))}
          </dl>
        </div>

        <div className="story-card glass" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="story-card-top">
            <span className="story-index">{String(index + 1).padStart(2, "0")} <i>/ {String(count).padStart(2, "0")}</i></span>
            <span className="story-label" key={slide.label}>{slide.label}</span>
          </div>
          <p className="story-caption" key={slide.caption}>{slide.caption}</p>
          <div className="story-card-bottom">
            <button className="story-link" onClick={() => open({ story: slide.story, image: slide.src, position: slide.position })}>
              Read the story <span aria-hidden>→</span>
            </button>
            <div className="story-nav">
              <button onClick={() => go(index - 1)} aria-label="Previous image">←</button>
              <button onClick={() => go(index + 1)} aria-label="Next image">→</button>
            </div>
          </div>
          <div className="story-progress" data-paused={holding}>
            {slides.map((s, i) => (
              <button key={s.src} onClick={() => go(i)} aria-label={`Show ${s.label}`} data-state={i < index ? "done" : i === index ? "active" : "idle"}>
                <span key={i === index ? `a${index}` : "x"} style={{ animationDuration: `${DURATION}ms` }} />
              </button>
            ))}
          </div>
        </div>

        <a href="#work" className="scroll-cue" aria-label="Scroll to work"><span /></a>
      </div>
    </section>
  );
}
