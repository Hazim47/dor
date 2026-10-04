"use client";
import { CartProvider, useCart } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Hero, { Marquee } from "@/components/Hero";
import Menu from "@/components/Menu";
import { Why, How } from "@/components/Features";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CursorGlow, Preloader, ScrollProgress, Toast } from "@/components/Effects";

function ToastHost() {
  const { toast } = useCart();
  return <Toast message={toast} />;
}

export default function Page() {
  return (
    <CartProvider>
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Menu />
        <Why />
        <How />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <ToastHost />
    </CartProvider>
  );
}
