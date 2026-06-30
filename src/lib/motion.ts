import type { Variants } from "framer-motion";

/* 공용 ease — globals.css의 --ease-out-expo와 동일 곡선 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** 섹션 등장: 컨테이너가 자식을 순차(stagger)로 노출 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/** 아래 → 위로 부드럽게 페이드인. transform/opacity만 사용 (CLS·페인트 안전) */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/** reduced-motion일 때 적용할 무모션 variants */
export const noMotion: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};
