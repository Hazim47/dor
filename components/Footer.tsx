"use client";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { Reveal, Leaf } from "./Common";
import { SITE } from "@/lib/config";

const Ig = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const Fb = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.600-1.500h1.700V4.400c-.3 0-1.300-.1-2.400-.1-2.400 0-4 1.500-4 4.100v2.400H7.700V14h2.700v8h3.100z" />
  </svg>
);
const Wa = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.600 15L2 22l5.200-1.400A10 10 0 1 0 12 2zm5.500 12.400c-.3-.1-1.700-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.100-.2.200-.3.200-.6.100-3-1.200-4.200-4.400-4.300-4.600-.1-.2 0-.3.1-.4l.4-.5c.1-.2.2-.3.2-.5s0-.4 0-.5c-.1-.1-.7-1.600-.9-2.200-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.400s1 2.800 1.200 3c.1.2 2 3.100 4.900 4.300 1.800.8 2.500.8 3.400.7.500-.1 1.700-.7 1.900-1.400.2-.7.2-1.200.2-1.400-.1-.1-.3-.2-.6-.3z" />
  </svg>
);

export default function Footer() {
  const socials = [
    { href: SITE.instagram, icon: <Ig />, label: "Instagram" },
    { href: SITE.facebook, icon: <Fb />, label: "Facebook" },
    { href: `https://wa.me/${SITE.whatsapp}`, icon: <Wa />, label: "WhatsApp" },
  ];
  return (
    <footer id="contact" className="footer">
      <div className="footer-corner-logo">
        <Logo size={0.9} light />
      </div>
      <svg
        className="footer-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path d="M0,40 C240,110 480,0 720,50 C960,100 1200,20 1440,70 L1440,0 L0,0 Z" />
      </svg>
      <div className="footer-leaves">
        <Leaf size={120} />
        <Leaf size={80} />
        <Leaf size={160} />
      </div>
      <div className="container footer-grid">
        <Reveal>
          <div className="footer-brand">
            <p>وجبات صحية .. طازجة .. محسوبة. اختيارك الأفضل لصحتك.</p>
            <div className="socials">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -8, scale: 1.15, rotate: 8 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, type: "spring" }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="footer-col">
            <h4>روابط سريعة</h4>
            {[
              ["#home", "الرئيسية"],
              ["#menu", "المنيو"],
              ["#why", "لماذا Dor"],
              ["#how", "كيف تطلب"],
            ].map(([h, l]) => (
              <motion.a key={h} href={h} whileHover={{ x: -8 }}>
                {l}
              </motion.a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="footer-col">
            <h4>تواصل معنا</h4>
            <motion.a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: -8 }}
              dir="ltr"
              style={{ textAlign: "right" }}
            >
              📞 {SITE.phone}
            </motion.a>
            <motion.a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: -8 }}
              dir="ltr"
              style={{ textAlign: "right" }}
            >
              📷 @dor._jo
            </motion.a>
            <motion.a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: -8 }}
            >
              👍 صفحتنا على فيسبوك
            </motion.a>
          </div>
        </Reveal>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Dor - دوّر. جميع الحقوق محفوظة 🌿
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="wa-float"
      aria-label="واتساب"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 3.4, type: "spring" }}
      whileHover={{ scale: 1.15, rotate: 10 }}
    >
      <Wa />
      <span className="wa-pulse" />
    </motion.a>
  );
}
