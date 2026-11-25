"use client";
import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/* Image that survives a failed load: retries once, then falls back to the .jpg copy in /public. */
export function SafeImg({ src, alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLImageElement>(null);
  const fail = () => setStep((s) => Math.min(s + 1, 2));
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) fail(); // errored before hydration
  }, [src, step]);
  const url = step === 0 ? src : step === 1 ? `${src}?r=1` : src.replace(/\.webp$/, ".jpg");
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={url} alt={alt} onError={fail} {...rest} />;
}
