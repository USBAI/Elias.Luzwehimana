"use client";
import { useEffect, useRef, useState } from "react";

/* Organisation logo in a white tile; falls back to a monogram if the file is missing. */
export function Logo({ src, mark, name, size = "md" }: { src?: string; mark?: string; name: string; size?: "md" | "sm" }) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true); // errored before hydration
  }, [src]);
  const show = src && !failed;
  return (
    <span className={`logo logo-${size}`} data-kind={show ? "img" : "mark"}>
      {show
        // eslint-disable-next-line @next/next/no-img-element
        ? <img ref={img} src={src} alt={name} onError={() => setFailed(true)} />
        : <b aria-label={name}>{mark ?? name.slice(0, 1)}</b>}
    </span>
  );
}
