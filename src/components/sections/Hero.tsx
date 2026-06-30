"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { useSmoothScrollTo } from "@/hooks/useSmoothScrollTo";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scrollTo = useSmoothScrollTo();

  // 이 섹션이 뷰포트를 지나는 0→1 진행도.
  // useScroll/useTransform은 MotionValue로 동작 → React 리렌더 없이
  // DOM transform을 직접 갱신해 60fps 유지 (핵심 성능 포인트).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 레이어별로 다른 속도 → 깊이감(패럴랙스). transform/opacity만 사용.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden"
    >
      {/* 배경 레이어 — 패럴랙스로 천천히 이동 */}
      <m.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <SmartImage
          src="https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="어두운 조명의 헬스장에서 바벨을 드는 사람"
          width={1920}
          height={1080}
          sizes="100vw"
          wrapperClassName="h-full w-full"
          className="h-full w-full"
        />
      </m.div>

      {/* 가독성용 그라데이션 오버레이 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 to-transparent" />

      {/* 콘텐츠 레이어 — 더 빠르게 위로 빠지며 페이드아웃 */}
      <m.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-6xl px-6 will-change-transform"
      >
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-sm text-mute backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-neon" />
          서울 성수 · 연중무휴 24시간
        </p>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
          오늘의 운동이
          <br />
          <span className="text-neon">내일</span>을 바꾼다
        </h1>
        <p className="mt-6 max-w-xl text-lg text-mute">
          프리웨이트부터 컨디셔닝까지, 목표에 맞춘 프로그램과 24시간 시설.
          운동을 일상으로 만드는 가장 확실한 방법이에요.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <button
            onClick={() => scrollTo("#pricing")}
            className="glow-neon rounded-full bg-neon px-7 py-3.5 font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            멤버십 보기
          </button>
          <button
            onClick={() => scrollTo("#programs")}
            className="rounded-full border border-line bg-surface/50 px-7 py-3.5 font-semibold text-fg backdrop-blur transition-colors duration-200 hover:border-neon/60 hover:text-neon"
          >
            프로그램 둘러보기
          </button>
        </div>
      </m.div>

      {/* 스크롤 인디케이터 — CSS-only */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mute">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">scroll</span>
          <div className="flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
            <span className="animate-nudge h-2 w-1 rounded-full bg-neon" />
          </div>
        </div>
      </div>
    </section>
  );
}
