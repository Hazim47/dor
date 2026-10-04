export type Size = {
  label: string;
  price: number;
  note?: string;
};

export type ProductOption = {
  label: string;
  values: string[];
  required?: boolean;
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export type Product = {
  id: string;
  name: string;
  desc?: string;
  category: string;
  sizes: Size[];
  options?: ProductOption[];
  image: string;
  emoji: string;
  tag?: string;
};

export const categories: Category[] = [
  { id: "main", name: "وجبات رئيسية", emoji: "🍗" },
  { id: "pasta", name: "معكرونة", emoji: "🍝" },
  { id: "sandwich", name: "ساندويتشات وسلطات", emoji: "🥪" },
  { id: "cocktail", name: "كوكتيل", emoji: "🥤" },
  { id: "pudding", name: "بودينج وبروتين", emoji: "🍮" },
];

const SL = (small: number, large: number, sn?: string, ln?: string): Size[] => [
  { label: "صغير", price: small, note: sn },
  { label: "كبير", price: large, note: ln },
];
const ONE = (price: number): Size[] => [{ label: "عادي", price }];

export const products: Product[] = [
  // ---------- وجبات رئيسية ----------
  {
    id: "veg-soup-rice",
    category: "main",
    name: "أرز وشوربة الخضار مع دجاج",
    desc: "دجاج مشوي مع أرز وشوربة خضار طازجة",
    sizes: SL(2.75, 3.5),
    image: "/images/main-veg-soup-chicken.jpg",
    emoji: "🍗",
    tag: "الأكثر طلباً",
  },
  {
    id: "potato-soup-rice",
    category: "main",
    name: "أرز وشوربة البطاطا باللبن مع دجاج",
    desc: "دجاج مشوي مع أرز وشوربة بطاطا باللبن",
    sizes: SL(2.75, 3.5),
    image: "/images/main-potato-soup-chicken.jpg",
    emoji: "🥣",
  },
  {
    id: "mushroom-soup-rice",
    category: "main",
    name: "أرز وشوربة كريمة الفطر مع دجاج",
    desc: "دجاج مشوي مع أرز وشوربة كريمة الفطر",
    sizes: SL(2.75, 3.5),
    image: "/images/main-mushroom-soup-chicken.jpg",
    emoji: "🍄",
  },

  // ---------- معكرونة ----------
  {
    id: "pasta-chicken",
    category: "pasta",
    name: "معكرونة بالخضار مع الدجاج وموزاريلا",
    desc: "معكرونة بكريمة طبخ، دجاج مشوي وجبنة موزاريلا",
    sizes: SL(2.75, 3.5),
    image: "/images/pasta-chicken-mozzarella.jpg",
    emoji: "🍝",
    tag: "جديد",
  },

  // ---------- ساندويتشات وسلطات ----------
  {
    id: "sand-chicken",
    category: "sandwich",
    name: "ساندويش دجاج سادة",
    desc: "خبز أسمر محمّص مع دجاج مشوي",
    sizes: ONE(2),
    image: "/images/sandwich-chicken.jpg",
    emoji: "🥪",
  },
  {
    id: "sand-halloumi",
    category: "sandwich",
    name: "ساندويش حلوم مشوي",
    desc: "حلوم مشوي على خبز أسمر محمّص",
    sizes: ONE(2),
    image: "/images/sandwich-halloumi.jpg",
    emoji: "🧀",
  },
  {
    id: "sand-egg",
    category: "sandwich",
    name: "ساندويش بيض وجبنة شيدر",
    desc: "بيض وجبنة شيدر على خبز أسمر محمّص",
    sizes: ONE(2),
    image: "/images/sandwich-egg-cheddar.jpg",
    emoji: "🍳",
  },
  {
    id: "tuna-salad",
    category: "sandwich",
    name: "سلطة تونا",
    desc: "تونة، ذرة، جرجير، زيت زيتون وشرائح ليمون",
    sizes: ONE(2),
    image: "/images/salad-tuna.jpg",
    emoji: "🥗",
  },

  // ---------- كوكتيل ----------
  {
    id: "dor-cocktail",
    category: "cocktail",
    name: "كوكتيل Dor الضخامة",
    desc: "1000 كالوريز لمن يريد الضخامة",
    sizes: SL(2.25, 3),
    image: "/images/cocktail-dor-mass.jpg",
    emoji: "🥤",
    tag: "ضخامة",
  },
  {
    id: "protein-vanilla",
    category: "cocktail",
    name: "سموذي بروتين فانيلا",
    sizes: SL(2.25, 3, "25 غم بروتين", "40 غم بروتين"),
    image: "/images/cocktail-protein-vanilla.jpg",
    emoji: "🍦",
  },
  {
    id: "protein-strawberry",
    category: "cocktail",
    name: "سموذي بروتين فراولة",
    sizes: SL(2.25, 3, "25 غم بروتين", "40 غم بروتين"),
    image: "/images/cocktail-protein-strawberry.jpg",
    emoji: "🍓",
  },
  {
    id: "protein-chocolate",
    category: "cocktail",
    name: "سموذي بروتين شوكولاتة",
    sizes: SL(2.25, 3, "25 غم بروتين", "40 غم بروتين"),
    image: "/images/cocktail-protein-chocolate.jpg",
    emoji: "🍫",
  },
  {
    id: "avocado",
    category: "cocktail",
    name: "أفوكادو",
    sizes: SL(1.5, 2.25),
    image: "/images/cocktail-avocado.jpg",
    emoji: "🥑",
  },
  {
    id: "banana-milk-strawberry",
    category: "cocktail",
    name: "موز وحليب وفراولة",
    desc: "كوكتيل طبيعي",
    sizes: SL(1, 1.5),
    image: "/images/cocktail-banana-strawberry.jpg",
    emoji: "🍌",
  },
  {
    id: "banana-milk",
    category: "cocktail",
    name: "موز وحليب",
    desc: "كوكتيل طبيعي",
    sizes: SL(1, 1.5),
    image: "/images/cocktail-banana-milk.jpg",
    emoji: "🥛",
  },

  // ---------- بودينج وبروتين ----------
  {
    id: "pudding",
    category: "pudding",
    name: "بودينج",
    desc: "بودينج بنكهات متعددة",
    sizes: ONE(2),
    options: [
      {
        label: "اختر النكهة",
        values: [
          "براونيز",
          "وايت",
          "لوتس",
          "سنيكرز",
          "تيراميسو",
          "ماتشا",
          "تشيز كيك",
          "شوكولاتة",
        ],
        required: true,
      },
    ],
    image: "/images/pudding.jpg",
    emoji: "🍮",
    tag: "نكهات متعددة",
  },

  {
    id: "protein-bar",
    category: "pudding",
    name: "بار بروتين (10 غرام بروتين)",
    sizes: ONE(1),
    image: "/images/protein-bar.jpg",
    emoji: "🍫",
  },

  {
    id: "energy-bar",
    category: "pudding",
    name: "إنرجي بار",
    sizes: ONE(1),
    image: "/images/energy-bar.jpg",
    emoji: "🔋",
  },
  {
    id: "energy-drink",
    category: "pudding",
    name: "إنرجي درينك",
    sizes: ONE(2),
    image: "/images/energy-drink.jpg",
    emoji: "🥫",
  },
  {
    id: "water",
    category: "pudding",
    name: "مياه",
    sizes: SL(0.25, 0.4),
    image: "/images/water.jpg",
    emoji: "💧",
  },
];

export const fmt = (n: number) => n.toFixed(2);
