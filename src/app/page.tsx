import { Navbar } from "@/components/layout/Navbar";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Programs } from "@/components/sections/Programs";

// page.tsx 자체는 서버 컴포넌트 — 인터랙션이 있는 자식만 'use client'.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
