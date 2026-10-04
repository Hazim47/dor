"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { fmt } from "@/lib/menu";
import { SITE } from "@/lib/config";
import { ProductImage } from "./Common";

export default function CartDrawer() {
  const { items, total, count, open, setOpen, inc, dec, remove, clear } =
    useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const send = () => {
    if (items.length === 0) return;
    if (
      !name.trim() ||
      !phone.trim() ||
      (type === "delivery" && !address.trim())
    ) {
      setError(
        "الرجاء تعبئة الاسم ورقم الهاتف" +
          (type === "delivery" ? " والعنوان" : ""),
      );
      return;
    }
    setError("");
    const lines = items.map((i, idx) => {
      const optionsText = i.options ? Object.values(i.options).join(" - ") : "";

      return `${idx + 1}) ${i.name}${
        i.sizeLabel !== "عادي" ? ` (${i.sizeLabel})` : ""
      }${optionsText ? ` - ${optionsText}` : ""} × ${
        i.qty
      } = ${fmt(i.price * i.qty)} ${SITE.currency}`;
    });
    const msg = [
      `🌿 *طلب جديد من Dor* 🌿`,
      `━━━━━━━━━━━━`,
      `👤 الاسم: ${name}`,
      `📞 الهاتف: ${phone}`,
      `🛵 نوع الطلب: ${type === "delivery" ? "توصيل" : "استلام من المطعم"}`,
      type === "delivery" ? `📍 العنوان: ${address}` : "",
      `━━━━━━━━━━━━`,
      `*الطلب:*`,
      ...lines,
      `━━━━━━━━━━━━`,
      `💰 *المجموع: ${fmt(total)} ${SITE.currency}*`,
      notes.trim() ? `📝 ملاحظات: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="drawer"
            initial={{ x: "-110%" }}
            animate={{ x: 0 }}
            exit={{ x: "-110%" }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          >
            <div className="drawer-head">
              <h3>
                🛒 سلتك <span>({count})</span>
              </h3>
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="إغلاق"
              >
                ✕
              </motion.button>
            </div>

            <div className="drawer-body">
              {items.length === 0 ? (
                <motion.div
                  className="empty"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="empty-emoji"
                  >
                    🥗
                  </motion.div>
                  <p>سلتك فاضية</p>
                  <small>ضيف أشياء لذيذة من المنيو</small>
                  <a
                    href="#menu"
                    className="btn btn-primary"
                    onClick={() => setOpen(false)}
                  >
                    تصفّح المنيو
                  </a>
                </motion.div>
              ) : (
                <>
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.div
                        key={i.key}
                        layout
                        className="cart-item"
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 80, height: 0, marginBottom: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 28,
                        }}
                      >
                        <div className="ci-img">
                          <ProductImage
                            src={i.image}
                            alt={i.name}
                            emoji={i.emoji}
                          />
                        </div>
                        <div className="ci-info">
                          <b>{i.name}</b>

                          {i.sizeLabel !== "عادي" && (
                            <small>الحجم: {i.sizeLabel}</small>
                          )}

                          {i.options &&
                            Object.values(i.options).map((value) => (
                              <small key={value}>النوع: {value}</small>
                            ))}

                          <div className="ci-row">
                            <div className="qty">
                              <button onClick={() => dec(i.key)}>−</button>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                  key={i.qty}
                                  initial={{ y: -10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: 10, opacity: 0 }}
                                >
                                  {i.qty}
                                </motion.span>
                              </AnimatePresence>
                              <button onClick={() => inc(i.key)}>+</button>
                            </div>
                            <strong>
                              {fmt(i.price * i.qty)} {SITE.currency}
                            </strong>
                          </div>
                        </div>
                        <button
                          className="ci-del"
                          onClick={() => remove(i.key)}
                          aria-label="حذف"
                        >
                          🗑
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button className="clear-btn" onClick={clear}>
                    تفريغ السلة
                  </button>

                  <div className="form">
                    <h4>معلومات الطلب</h4>
                    <div className="seg">
                      {(["delivery", "pickup"] as const).map((t) => (
                        <button
                          key={t}
                          className={type === t ? "active" : ""}
                          onClick={() => setType(t)}
                        >
                          {type === t && (
                            <motion.span
                              layoutId="seg-pill"
                              className="seg-pill"
                            />
                          )}
                          <span>
                            {t === "delivery" ? "🛵 توصيل" : "🏪 استلام"}
                          </span>
                        </button>
                      ))}
                    </div>
                    <input
                      placeholder="الاسم"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      placeholder="رقم الهاتف"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <AnimatePresence initial={false}>
                      {type === "delivery" && (
                        <motion.input
                          key="addr"
                          placeholder="العنوان بالتفصيل"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 48 }}
                          exit={{ opacity: 0, height: 0 }}
                        />
                      )}
                    </AnimatePresence>
                    <textarea
                      placeholder="ملاحظات (اختياري)"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          className="form-error"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: [0, -8, 8, -4, 0] }}
                          exit={{ opacity: 0 }}
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="drawer-foot">
                <div className="total">
                  <span>المجموع الكلي</span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.b
                      key={total}
                      initial={{ y: 16, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                    >
                      {fmt(total)} {SITE.currency}
                    </motion.b>
                  </AnimatePresence>
                </div>
                <small className="note">
                  رسوم التوصيل (إن وجدت) تُحدد حسب المنطقة عند تأكيد الطلب.
                </small>
                <motion.button
                  className="btn btn-wa shine"
                  onClick={send}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.800 1.200 3c.1.200 2 3.100 4.900 4.300.7.300 1.200.5 1.600.6.7.2 1.300.2 1.800.1.500-.1 1.700-.7 1.900-1.400.2-.7.2-1.200.2-1.400-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.600 15L2 22l5.200-1.400A10 10 0 1 0 12 2z" />
                  </svg>
                  إرسال الطلب عبر واتساب
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
