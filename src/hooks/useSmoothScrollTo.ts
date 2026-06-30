"use client";

import { useCallback } from "react";

const HEADER_OFFSET = 72; // sticky 헤더 높이

/**
 * 앵커(#id) 클릭 시 헤더 높이를 보정한 부드러운 스크롤.
 * 기본 scrollIntoView는 sticky 헤더에 제목이 가리므로 offset 계산해서 직접 스크롤.
 */
export function useSmoothScrollTo() {
  return useCallback((href: string, onDone?: () => void) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const top =
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    onDone?.();
  }, []);
}
