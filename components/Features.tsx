"use client";
import { motion } from "framer-motion";
import { Counter, Reveal, SectionTitle } from "./Common";
import { products } from "@/lib/menu";

const feats = [
  { icon: "🌿", title: "طازج", text: "مكونات طازجة نحضّرها يومياً بدون أي تعقيد." },
  { icon: "❤️", title: "لذيذ", text: "نكهات مدروسة تخليك تنسى إنو الأكل صحي." },
  { icon: "💪", title: "عالي بالبروتين", text: "وجبات وسموذي بروتين تناسب الرياضيين وكل شخص يهتم بصحته." },
  { icon: "🧮", title: "محسوب", text: "وجبات متوازنة وسعرات محسوبة بحجم صغير وكبير." },
];

export function Why() {
  return (
    <section id="why" className="section why">
      <div className="container">
        <SectionTitle kicker="لماذا Dor" title="اختيارك الأفضل لصحتك" sub="كل شي عنا مبني على فكرة وحدة: أكل صحي ولذيذ وبسعر مناسب." />
        <div className="feat-grid">
          {feats.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.12}>
              <motion.div className="feat-card" whileHover={{ y: -12, rotateX: 6, rotateY: -6 }} style={{ transformPerspective: 800 }}>
                <motion.div className="feat-icon" animate={{ rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 5, delay: i * 0.5 }}>{f.icon}</motion.div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <span className="feat-glow" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="stats">
            <div><b><Counter to={products.length} suffix="+" /></b><span>صنف في المنيو</span></div>
            <div><b><Counter to={2} /></b><span>حجم لكل وجبة</span></div>
            <div><b><Counter to={40} suffix="غم" /></b><span>بروتين بأكبر سموذي</span></div>
            <div><b><Counter to={100} suffix="%" /></b><span>طازج</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function How() {
  const steps = [
    { n: "1", icon: "🍽️", t: "اختر طلبك", d: "تصفّح المنيو واختر الصنف والحجم (صغير أو كبير)." },
    { n: "2", icon: "🛒", t: "راجع السلة", d: "شوف كل عنصر والمجموع الكامل وعدّل الكميات." },
    { n: "3", icon: "💬", t: "ارسل عالواتساب", d: "عبّي معلوماتك وابعت الطلب مباشرة على واتساب المطعم." },
  ];
  return (
    <section id="how" className="section how">
      <div className="container">
        <SectionTitle kicker="سهل وسريع" title="كيف تطلب من Dor" />
        <div className="steps">
          <motion.div className="steps-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.2}>
              <motion.div className="step" whileHover={{ scale: 1.05 }}>
                <motion.div className="step-circle" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.3 + i * 0.25 }}>
                  <span>{s.icon}</span><i>{s.n}</i>
                </motion.div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
