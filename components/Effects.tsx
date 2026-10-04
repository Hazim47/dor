"use client";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Leaf } from "./Common";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const m = (e: MouseEvent) => {
      x.set(e.clientX - 150);
      y.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />;
}

export function FloatingLeaves({ count = 14 }: { count?: number }) {
  return (
    <div className="leaves" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="leaf-float"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i * 1.7) % 12}s`,
            animationDuration: `${14 + ((i * 5) % 12)}s`,
            fontSize: `${16 + ((i * 7) % 28)}px`,
            opacity: 0.12 + ((i * 3) % 6) / 30,
          }}
        >
          <Leaf size={16 + ((i * 7) % 28)} />
        </span>
      ))}
    </div>
  );
}

export function Preloader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
        >
          <div className="pre-rings">
            <i />
            <i />
            <i />
          </div>
          <Logo size={1.5} light />
          <motion.div
            className="pre-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            وجبات صحية .. طازجة .. محسوبة
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          initial={{ y: 80, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring" }}
          >
            ✓
          </motion.span>
          <div>
            <b>تمت الإضافة للسلة</b>
            <small>{message}</small>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
