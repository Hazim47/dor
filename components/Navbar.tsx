"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useCart } from "@/lib/cart";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#menu", label: "المنيو" },
  { href: "#why", label: "لماذا Dor" },
  { href: "#how", label: "كيف تطلب" },
  { href: "#contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "nav-scrolled" : ""}`}
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.6, type: "spring", stiffness: 90, damping: 16 }}
      >
        <a href="#home" className="nav-logo">
          <Logo size={0.55} light={!scrolled} />
        </a>
        <nav className="nav-links">
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9 + i * 0.08 }}
              whileHover={{ y: -2 }}
            >
              {l.label}
              <span className="nav-underline" />
            </motion.a>
          ))}
        </nav>
        <div className="nav-actions">
          <motion.button
            className="cart-btn"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="السلة"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            <AnimatePresence mode="popLayout">
              {count > 0 && (
                <motion.b
                  key={count}
                  className="cart-badge"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                >
                  {count}
                </motion.b>
              )}
            </AnimatePresence>
          </motion.button>
          <button
            className={`burger ${menu ? "open" : ""}`}
            onClick={() => setMenu(!menu)}
            aria-label="القائمة"
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
