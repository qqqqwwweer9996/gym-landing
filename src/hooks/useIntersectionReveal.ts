"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** 뷰포트 진입 임계값 */
  threshold?: number;
  /** 하단에서 미리 트리거 (음수 margin = 더 늦게) */
  rootMargin?: string;
  /** 한 번만 트리거하고 옵저버 해제 (성능) */
  once?: boolean;
};

/**
 * IntersectionObserver 기반 등장 트리거 (직접 구현).
 * - 트리거 후 once면 unobserve → 옵저버 누수/불필요 콜백 방지
 * - ref를 단다 → 어떤 엘리먼트든 재사용 가능
 */
export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IO 미지원 환경 폴백: 즉시 노출
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
