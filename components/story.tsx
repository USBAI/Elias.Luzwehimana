"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Story } from "@/lib/content";

type Open = { story: Story; image?: string; position?: string };
const Ctx = createContext<{ open: (o: Open) => void; isOpen: boolean }>({ open: () => {}, isOpen: false });
export const useStory = () => useContext(Ctx);

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Open | null>(null);
  const [visible, setVisible] = useState(false);
  const open = useCallback((o: Open) => { setCurrent(o); requestAnimationFrame(() => setVisible(true)); }, []);
  const close = useCallback(() => { setVisible(false); setTimeout(() => setCurrent(null), 380); }, []);

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [current, close]);

  return (
    <Ctx.Provider value={{ open, isOpen: !!current }}>
      {children}
      {current && (
        <div className="drawer-root" data-visible={visible}>
          <button className="drawer-scrim" aria-label="Close story" onClick={close} />
          <aside className="drawer" role="dialog" aria-modal="true" aria-label={current.story.title}>
            <button className="drawer-close" onClick={close} aria-label="Close">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
            {current.image && (
              <div className="drawer-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={current.image} alt="" style={{ objectPosition: current.position }} />
              </div>
            )}
            <div className="drawer-body">
              <p className="kicker">{current.story.kicker}</p>
              <h3>{current.story.title}</h3>
              {current.story.body.map((p) => <p key={p} className="drawer-text">{p}</p>)}
              {current.story.meta && (
                <dl className="drawer-meta">
                  {current.story.meta.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
                </dl>
              )}
              {current.story.tags && <ul className="tags">{current.story.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
              {current.story.link && (
                <a className="btn btn-lime" href={current.story.link.href} target="_blank" rel="noreferrer">
                  {current.story.link.label} <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </aside>
        </div>
      )}
    </Ctx.Provider>
  );
}
