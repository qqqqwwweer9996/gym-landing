"use client";

import { useEffect, useState } from "react";

/**
 * OS의 "동작 줄이기" 설정을 구독한다.
 * 모든 애니메이션 컴포넌트가 이 값으로 모션을 끌 수 있게 단일 출처로 둠.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
