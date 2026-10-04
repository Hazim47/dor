"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { categories, fmt, Product, products } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { ProductImage, SectionTitle } from "./Common";
import { SITE } from "@/lib/config";

function ProductCard({ p, index }: { p: Product; index: number }) {
  const { add } = useCart();
  const [si, setSi] = useState(0);
  const [done, setDone] = useState(false);
  const [optionError, setOptionError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const size = p.sizes[si];
  const multi = p.sizes.length > 1;

  const hasOptions = p.options && p.options.length > 0;

  const onAdd = () => {
    if (hasOptions) {
      const missingRequired = p.options?.some(
        (option) => option.required && !selectedOptions[option.label],
      );

      if (missingRequired) {
        setOptionError("⚠️ اختر نكهة البودينج أولاً");
        setTimeout(() => setOptionError(""), 2200);
        return;
      }
    }

    setOptionError("");
    add(p, size, selectedOptions);

    setDone(true);
    setTimeout(() => setDone(false), 1100);
  };

  return (
    <motion.article
      layout
      className="card"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        delay: (index % 6) * 0.07,
        type: "spring",
        stiffness: 140,
        damping: 18,
      }}
      whileHover={{ y: -10 }}
    >
      <div className="card-img">
        <div
          className="card-bg"
          style={{ backgroundImage: `url(${p.image})` }}
        />

        <motion.div
          className="card-img-inner"
          whileHover={{ scale: 1.12, rotate: 1.5 }}
          transition={{ duration: 0.6 }}
        >
          <ProductImage src={p.image} alt={p.name} emoji={p.emoji} />
        </motion.div>

        {p.tag && (
          <motion.span
            className="card-tag"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {p.tag}
          </motion.span>
        )}

        <span className="card-shine" />
      </div>

      <div className="card-body">
        <h3>{p.name}</h3>

        {p.desc && <p className="card-desc">{p.desc}</p>}

        {multi && (
          <div className="sizes">
            {p.sizes.map((s, i) => (
              <button
                key={s.label}
                className={i === si ? "active" : ""}
                onClick={() => setSi(i)}
              >
                {i === si && (
                  <motion.span
                    layoutId={`size-${p.id}`}
                    className="size-pill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <span className="size-txt">{s.label}</span>
              </button>
            ))}
          </div>
        )}

        {size.note && <small className="size-note">{size.note}</small>}

        {/* خيارات المنتج مثل نكهات البودينج */}
        {hasOptions && (
          <div className="product-options">
            {p.options?.map((option) => (
              <div key={option.label} className="product-option">
                <span className="option-label">
                  {option.label}
                  {option.required && <small> مطلوب</small>}
                </span>

                <div className="option-values">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={
                        selectedOptions[option.label] === value
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [option.label]: value,
                        }))
                      }
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {optionError && (
          <motion.div
            className="option-error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {optionError}
          </motion.div>
        )}

        <div className="card-foot">
          <div className="price">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.b
                key={size.price}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {fmt(size.price)}
              </motion.b>
            </AnimatePresence>

            <span>{SITE.currency}</span>
          </div>

          <motion.button
            className={`add-btn ${done ? "done" : ""}`}
            onClick={onAdd}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <motion.span
                  key="d"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                >
                  ✓ تمت
                </motion.span>
              ) : (
                <motion.span
                  key="a"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  + أضف
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Menu() {
  const [cat, setCat] = useState("main");
  const list = products.filter((p) => p.category === cat);

  return (
    <section id="menu" className="section menu">
      <div className="container">
        <SectionTitle
          kicker="منيو Dor"
          title="اختر وجبتك المفضلة"
          sub="لكل صنف حجم صغير وكبير. ضيف للسلة وشوف المجموع فوراً."
        />

        <div className="tabs">
          {categories.map((c) => (
            <button
              key={c.id}
              className={cat === c.id ? "active" : ""}
              onClick={() => setCat(c.id)}
            >
              {cat === c.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="tab-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="tab-txt">
                <motion.i
                  animate={
                    cat === c.id
                      ? { rotate: [0, -20, 20, 0], scale: [1, 1.4, 1] }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                >
                  {c.emoji}
                </motion.i>{" "}
                {c.name}
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
