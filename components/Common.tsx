"use client";
import { motion, useInView, animate } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

export function Reveal({ children, delay = 0, y = 40, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Leaf({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="currentColor" aria-hidden>
      <path d="M56 6C30 6 10 18 10 40c0 4 1 8 3 11 3-12 12-22 24-28-9 8-15 17-18 29 2 1 4 1 6 1 22 0 31-22 31-47z" />
    </svg>
  );
}

export function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="section-title">
      <Reveal>
        <span className="kicker"><Leaf size={16} /> {kicker}</span>
      </Reveal>
      <h2>
        {title.split(" ").map((w, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block", marginInline: "0.14em" }}
            initial={{ y: 60, opacity: 0, rotate: 6 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        ))}
      </h2>
      {sub && <Reveal delay={0.2}><p>{sub}</p></Reveal>}
      <motion.div className="title-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3 }} />
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: "easeOut", onUpdate: (l) => setV(Math.round(l)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function ProductImage({ src, alt, emoji }: { src: string; alt: string; emoji: string }) {
  const [err, setErr] = useState(false);
  if (err)
    return (
      <div className="img-fallback">
        <span className="img-fallback-emoji">{emoji}</span>
        <small dir="ltr">public{src}</small>
      </div>
    );
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} />;
}
