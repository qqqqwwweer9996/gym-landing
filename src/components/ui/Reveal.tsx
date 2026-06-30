"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, noMotion, staggerContainer } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** 자식들을 순차로 등장시킬지 (카드 그리드용) */
  stagger?: boolean;
  className?: string;
  as?: "div" | "section" | "ul" | "li";
};

/**
 * IntersectionObserver(커스텀 훅) + Framer variants 조합 등장 래퍼.
 * whileInView 대신 직접 만든 훅을 써서 트리거 시점/once 정리를 명시적으로 제어한다.
 */
export function Reveal({
  children,
  stagger = false,
  className = "",
  as = "div",
}: Props) {
  const { ref, inView } = useIntersectionReveal<HTMLDivElement>();
  const reduce = usePrefersReducedMotion();

  const MotionTag = m[as];
  const variants = reduce
    ? noMotion
    : stagger
      ? staggerContainer
      : fadeUp;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}

/** stagger 컨테이너 안에서 개별 아이템에 쓰는 자식 모션 래퍼 */
export function RevealItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = usePrefersReducedMotion();
  const MotionTag = m[as];
  return (
    <MotionTag className={className} variants={reduce ? noMotion : fadeUp}>
      {children}
    </MotionTag>
  );
}
