"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_ITEMS } from "@/lib/data";
import { useSmoothScrollTo } from "@/hooks/useSmoothScrollTo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = useSmoothScrollTo();
  const { scrollY } = useScroll();

  // 임계값을 넘을 때만 boolean 토글 → 프레임마다 리렌더하지 않음
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const go = (href: string) => {
    setMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
          <button
            onClick={() => scrollTo("#top")}
            className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-neon text-ink">
              ▲
            </span>
            APEX<span className="text-neon">FIT</span>
          </button>

          {/* 데스크탑 nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-sm font-medium text-mute transition-colors hover:text-neon"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#pricing")}
              className="rounded-full bg-neon px-5 py-2 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.04] active:scale-95"
            >
              등록하기
            </button>
          </nav>

          {/* 모바일 햄버거 */}
          <button
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="h-0.5 w-6 bg-fg" />
            <span className="h-0.5 w-6 bg-fg" />
            <span className="h-0.5 w-4 self-end bg-fg" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={go} />
    </>
  );
}
