"use client";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { FloatingLeaves } from "./Effects";
import { ProductImage } from "./Common";

const words = ["وجبات", "صحية", "طازجة", "محسوبة"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const x1 = useTransform(sx, (v) => v * -30);
  const y1 = useTransform(sy, (v) => v * -30);
  const x2 = useTransform(sx, (v) => v * 45);
  const y2 = useTransform(sy, (v) => v * 45);
  const x3 = useTransform(sx, (v) => v * -60);
  const y3 = useTransform(sy, (v) => v * 20);

  return (
    <section
      id="home"
      className="hero"
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <FloatingLeaves count={18} />
      <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />

      <div className="container hero-grid">
        <motion.div className="hero-text" style={{ y: yText, opacity: fade }}>
          <motion.span className="pill" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3, type: "spring" }}>
            🌿 اختيارك الأفضل لصحتك
          </motion.span>
          <h1>
            {words.map((w, i) => (
              <span className="word-mask" key={w}>
                <motion.span
                  className={i % 2 ? "accent" : ""}
                  initial={{ y: "120%", rotate: 8 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: 3 + i * 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.7 }}>
            في Dor نجهّز لك وجبات متوازنة بسعرات وبروتين محسوب، من مكونات طازجة، وتوصلك بسرعة. اختر طلبك، شوف المجموع، وابعته واتساب بضغطة وحدة.
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.9 }}>
            <motion.a href="#menu" className="btn btn-primary shine" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>اطلب الآن <span>←</span></motion.a>
            <motion.a href="#how" className="btn btn-ghost" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>كيف تطلب؟</motion.a>
          </motion.div>
          <motion.div className="hero-tags" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2 }}>
            {["طازج", "لذيذ", "عالي بالبروتين"].map((t, i) => (
              <motion.span key={t} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }}>✔ {t}</motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: yBig }}>
          <motion.div className="hero-ring" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} />
          <motion.div className="hero-ring r2" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} />

          <motion.div className="dish dish-main" style={{ x: x1, y: y1 }} initial={{ scale: 0, rotate: -120 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 3.2, type: "spring", stiffness: 70, damping: 12 }}>
            <motion.div animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
              <ProductImage src="/images/hero-main.jpg" alt="وجبة Dor" emoji="🍗" />
            </motion.div>
          </motion.div>
          <motion.div className="dish dish-2" style={{ x: x2, y: y2 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3.6, type: "spring" }}>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}>
              <ProductImage src="/images/hero-pasta.jpg" alt="معكرونة" emoji="🍝" />
            </motion.div>
          </motion.div>
          <motion.div className="dish dish-3" style={{ x: x3, y: y3 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3.9, type: "spring" }}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}>
              <ProductImage src="/images/hero-cocktail.jpg" alt="كوكتيل" emoji="🥤" />
            </motion.div>
          </motion.div>

          <motion.div className="float-chip chip-a" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>💪 40غم بروتين</motion.div>
          <motion.div className="float-chip chip-b" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }}>🥗 100% طازج</motion.div>

          <div className="badge-spin">
            <svg viewBox="0 0 120 120">
              <defs><path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
              <text><textPath href="#circ">BEST CHOICE FOR UR HEALTH • BEST CHOICE FOR UR HEALTH •</textPath></text>
            </svg>
            <span>🌿</span>
          </div>
        </motion.div>
      </div>

      <motion.div className="scroll-hint" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} style={{ opacity: fade }}>
        <i /> <small>اسحب للأسفل</small>
      </motion.div>
      <svg className="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,64 C240,120 480,0 720,40 C960,80 1200,110 1440,50 L1440,120 L0,120 Z" /></svg>
    </section>
  );
}

export function Marquee() {
  const items = ["طازج", "لذيذ", "عالي بالبروتين", "محسوب السعرات", "دجاج مشوي", "سموذي بروتين", "بودينج", "صحي 100%"];
  const row = [...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((t, i) => (<span key={i}>{t} <em>✦</em></span>))}
      </div>
    </div>
  );
}
