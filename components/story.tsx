"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { entry, suggestionsFor } from "@/lib/entries";
import { Logo } from "./logo";

const Ctx = createContext<{ open: (id: string) => void; isOpen: boolean }>({ open: () => {}, isOpen: false });
export const useStory = () => useContext(Ctx);

/* "Read more" opens a room about one page: the full story, the details, and then
   a few suggestions for where to go next. "Back" returns you to where you were. */
export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [swap, setSwap] = useState(false);
  const [progress, setProgress] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const backBtn = useRef<HTMLButtonElement>(null);

  const open = useCallback((next: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setId(next);
    requestAnimationFrame(() => requestAnimationFrame(() => { setVisible(true); backBtn.current?.focus(); }));
  }, []);
  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => { setId(null); setTimeout(() => lastFocus.current?.focus?.(), 60); }, 650);
  }, []);
  // Moving to a suggestion: fade the page out, swap, and start at the top.
  const go = useCallback((next: string) => {
    setSwap(true);
    setTimeout(() => {
      setId(next);
      if (scroller.current) scroller.current.scrollTop = 0;
      setProgress(0);
      requestAnimationFrame(() => setSwap(false));
    }, 380);
  }, []);

  useEffect(() => {
    if (!id || !scroller.current) return;
    const root = scroller.current;
    const onScroll = () => setProgress(root.scrollTop / Math.max(1, root.scrollHeight - root.clientHeight));
    root.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => { root.removeEventListener("scroll", onScroll); document.removeEventListener("keydown", onKey); };
  }, [id, close]);

  const e = id ? entry(id) : null;
  const s = e?.story;
  const suggestions = id ? suggestionsFor(id) : [];

  return (
    <Ctx.Provider value={{ open, isOpen: !!id }}>
      <div inert={!!id} style={{ display: "contents" }}>{children}</div>
      {e && s && (
        <div className="room" data-visible={visible} role="dialog" aria-modal="true" aria-label={s.title}>
          <div className="room-splash" aria-hidden><i /><i /><i /></div>
          <div className="room-progress" aria-hidden><span style={{ transform: `scaleX(${progress})` }} /></div>
          <header className="room-bar">
            <button className="room-back" ref={backBtn} onClick={close}><span aria-hidden>←</span> Back</button>
            <span className="room-where">{e.group}</span>
          </header>

          <div className="room-scroll" ref={scroller}>
            <article className="room-entry" data-swap={swap} key={id}>
              <header className="room-hero" data-image={!!e.image}>
                <div className="room-hero-copy">
                  <div className="room-head-top">
                    {(e.logo || e.mark) && <Logo src={e.logo} mark={e.mark} name={s.title} />}
                    {e.partner && (<><span className="logo-x">{e.partner.note}</span><Logo src={e.partner.logo} name={e.partner.name} /></>)}
                    {e.logos?.map((l) => <Logo key={l.src} src={l.src} name={l.name} />)}
                  </div>
                  <p className="room-kicker">{s.kicker}</p>
                  <h2 className="room-title">{s.title}</h2>
                  {s.meta && (
                    <dl className="room-facts">
                      {s.meta.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                    </dl>
                  )}
                </div>
                {e.image && (
                  <figure className="room-hero-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.image} alt="" style={{ objectPosition: e.position }} />
                    {e.credit && <figcaption>{e.credit}</figcaption>}
                  </figure>
                )}
              </header>

              <div className="room-body">
                <div className="room-text">
                  <p className="room-lead">{s.body[0]}</p>
                  {s.body.slice(1).map((p) => <p key={p}>{p}</p>)}
                </div>
                {(s.tags || s.link) && (
                  <aside className="room-side">
                    {s.tags && (<><p className="room-side-label">Stack & focus</p><ul className="tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul></>)}
                    {s.link && <a className="btn btn-dark" href={s.link.href} target="_blank" rel="noreferrer">{s.link.label} ↗</a>}
                  </aside>
                )}
              </div>

              {s.figure && (
                <section className="room-figure">
                  <a className="room-figure-img" href={s.figure.href ?? s.figure.src} target="_blank" rel="noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.figure.src} alt={s.figure.alt} />
                  </a>
                  <div className="room-figure-copy">
                    <p className="room-side-label">{s.figure.label}</p>
                    <h3>{s.figure.title}</h3>
                    <p>{s.figure.text}</p>
                    {s.meta && <dl>{s.meta.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
                    {s.figure.href && <a className="btn btn-dark" href={s.figure.href} target="_blank" rel="noreferrer">Open the PDF ↗</a>}
                  </div>
                </section>
              )}

              {s.sections && (
                <div className="room-sections">
                  {s.sections.map((sec, n) => (
                    <section key={sec.title} className="room-section">
                      <span className="room-section-n">{String(n + 1).padStart(2, "0")}</span>
                      <h3>{sec.title}</h3>
                      <ul>{sec.items.map((it) => <li key={it}>{it}</li>)}</ul>
                    </section>
                  ))}
                </div>
              )}

              <section className="room-suggest">
                <p className="room-side-label">You might also like</p>
                <div className="room-suggest-grid">
                  {suggestions.map((g) => (
                    <button key={g.id} className="suggest-card" onClick={() => go(g.id)}>
                      {g.image
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img className="suggest-img" src={g.image} alt="" style={{ objectPosition: g.position }} />
                        : <Logo src={g.logo} mark={g.mark} name={g.story.title} size="sm" />}
                      <span className="suggest-group">{g.group}</span>
                      <span className="suggest-title">{g.story.title}</span>
                      <span className="suggest-summary">{g.summary}</span>
                      <span className="suggest-go">Open <i aria-hidden>→</i></span>
                    </button>
                  ))}
                </div>
                <div className="room-end">
                  <button className="btn btn-dark" onClick={close}>← Back to where you were</button>
                </div>
              </section>
            </article>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
