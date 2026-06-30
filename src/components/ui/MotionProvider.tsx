"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * LazyMotion + 'm' 컴포넌트 전략.
 * 무거운 <motion.*> 대신 가벼운 <m.*>를 쓰고, 애니메이션 기능은
 * domAnimation 피처팩으로 한 번만 주입 → 초기 번들에서 Framer 코어만 로드.
 * (전체 motion 패키지 대비 초기 JS를 크게 절감)
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
