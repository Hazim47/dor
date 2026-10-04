"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product, Size } from "./menu";

export type CartItem = {
  key: string;
  productId: string;
  name: string;
  sizeLabel: string;
  price: number;
  qty: number;
  image: string;
  emoji: string;
  options?: Record<string, string>;
};

type Ctx = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product, s: Size, options?: Record<string, string>) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  toast: string | null;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dor-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("dor-cart", JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1900);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback(
    (p: Product, s: Size, options?: Record<string, string>) => {
      const optionsKey = options
        ? Object.entries(options)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}:${value}`)
            .join("|")
        : "";

      const key = `${p.id}-${s.label}-${optionsKey}`;

      setItems((prev) => {
        const found = prev.find((i) => i.key === key);

        if (found) {
          return prev.map((i) =>
            i.key === key ? { ...i, qty: i.qty + 1 } : i,
          );
        }

        return [
          ...prev,
          {
            key,
            productId: p.id,
            name: p.name,
            sizeLabel: s.label,
            price: s.price,
            qty: 1,
            image: p.image,
            emoji: p.emoji,
            options,
          },
        ];
      });

      const optionText = options ? Object.values(options).join(" - ") : "";

      setToast(
        `${p.name}${
          s.label !== "عادي" ? ` (${s.label})` : ""
        }${optionText ? ` - ${optionText}` : ""}`,
      );
    },
    [],
  );

  const inc = useCallback(
    (key: string) =>
      setItems((p) =>
        p.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i)),
      ),
    [],
  );
  const dec = useCallback(
    (key: string) =>
      setItems((p) =>
        p.flatMap((i) =>
          i.key === key ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i],
        ),
      ),
    [],
  );
  const remove = useCallback(
    (key: string) => setItems((p) => p.filter((i) => i.key !== key)),
    [],
  );
  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items]);
  const total = useMemo(
    () => items.reduce((a, i) => a + i.qty * i.price, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        open,
        setOpen,
        add,
        inc,
        dec,
        remove,
        clear,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
