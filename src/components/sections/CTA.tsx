"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useSmoothScrollTo } from "@/hooks/useSmoothScrollTo";

export function CTA() {
  const scrollTo = useSmoothScrollTo();

  return (
    <section id="cta" className="relative overflow-hidden bg-surface py-28">
      {/* 네온 글로우 배경 — 순수 CSS 그라데이션, 이미지 0 */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-neon/20 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            첫 일주일은
            <span className="text-neon"> 무료</span>로 다녀보세요
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mute">
            카드 등록 없이 체험하고, 마음에 들면 그때 결제하세요. 성수점에서
            기다리고 있을게요.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo("#pricing")}
              className="glow-neon rounded-full bg-neon px-8 py-4 font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              무료 체험 신청
            </button>
            <a
              href="tel:0212345678"
              className="rounded-full border border-line px-8 py-4 font-semibold text-fg transition-colors hover:border-neon/60 hover:text-neon"
            >
              02-1234-5678
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
