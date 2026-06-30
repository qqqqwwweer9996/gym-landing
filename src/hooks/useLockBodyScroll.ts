"use client";

import { useEffect } from "react";

/**
 * 모바일 메뉴가 열린 동안 body 스크롤을 잠근다.
 * 스크롤바 폭만큼 padding을 보정해 레이아웃 점프(CLS)를 막음.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}
