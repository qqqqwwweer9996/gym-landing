"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Plan } from "@/types";

const won = (n: number) => n.toLocaleString("ko-KR");
const EASE = [0.16, 1, 0.3, 1] as const;

type Status = "review" | "processing" | "done";

export function PlanConfirmModal({
  plan,
  onClose,
}: {
  plan: Plan | null;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("review");
  const reduce = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(!!plan);

  // 열릴 때마다 review로 초기화 (닫힘 시 plan이 null을 거치므로 재오픈에서 항상 발화)
  useEffect(() => {
    if (plan) setStatus("review");
  }, [plan]);

  // ESC 닫기 + 열릴 때 패널에 포커스 (접근성)
  useEffect(() => {
    if (!plan) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [plan, onClose]);

  // processing → done (결제 시뮬레이션). reduced-motion이면 거의 즉시.
  useEffect(() => {
    if (status !== "processing") return;
    const t = setTimeout(() => setStatus("done"), reduce ? 250 : 1300);
    return () => clearTimeout(t);
  }, [status, reduce]);

  return (
    <AnimatePresence onExitComplete={() => setStatus("review")}>
      {plan && (
        <m.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-modal="true"
          role="dialog"
        >
          {/* 백드롭 */}
          <button
            aria-label="닫기"
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          {/* 패널 — 스프링 등장 */}
          <m.div
            ref={panelRef}
            tabIndex={-1}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-surface p-7 outline-none"
          >
            {/* 상태별 콘텐츠 — mode=wait로 교차 전환 */}
            <AnimatePresence mode="wait">
              {status !== "done" ? (
                <m.div
                  key="review"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">
                    Checkout
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold text-fg">
                    {plan.name} 시작하기
                  </h3>
                  <p className="mt-1 text-sm text-mute">{plan.blurb}</p>

                  {/* 요약 */}
                  <div className="mt-6 rounded-2xl border border-line bg-ink/60 p-5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-mute">결제 금액</span>
                      <span className="text-3xl font-extrabold text-fg">
                        ₩{won(plan.price)}
                        <span className="ml-1 text-sm font-medium text-mute">
                          / {plan.period}
                        </span>
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2 border-t border-line pt-4">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-fg/90"
                        >
                          <span className="text-neon">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={onClose}
                      disabled={status === "processing"}
                      className="flex-1 rounded-full border border-line py-3 text-sm font-semibold text-fg transition-colors hover:border-neon/50 disabled:opacity-40"
                    >
                      닫기
                    </button>
                    <button
                      onClick={() => setStatus("processing")}
                      disabled={status === "processing"}
                      className="glow-neon flex flex-[1.4] items-center justify-center gap-2 rounded-full bg-neon py-3 text-sm font-bold text-ink transition-transform duration-200 hover:scale-[1.02] active:scale-95 disabled:cursor-wait"
                    >
                      {status === "processing" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                          처리 중…
                        </>
                      ) : (
                        "결제 진행하기"
                      )}
                    </button>
                  </div>
                </m.div>
              ) : (
                <m.div
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <SuccessCheck reduce={reduce} />
                  <m.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, ease: EASE }}
                    className="mt-6 text-2xl font-extrabold text-fg"
                  >
                    등록 완료!
                  </m.h3>
                  <m.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, ease: EASE }}
                    className="mt-2 text-sm text-mute"
                  >
                    <span className="font-semibold text-fg">{plan.name}</span>{" "}
                    플랜으로 함께하게 되어 반가워요. 성수점에서 만나요!
                  </m.p>
                  <m.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, ease: EASE }}
                    onClick={onClose}
                    className="mt-7 w-full rounded-full bg-neon py-3 text-sm font-bold text-ink transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                  >
                    확인
                  </m.button>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/** SVG pathLength로 그려지는 체크마크 + 네온 버스트 링 */
function SuccessCheck({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative grid h-24 w-24 place-items-center">
      {/* 네온 버스트 */}
      {!reduce && (
        <m.span
          initial={{ scale: 0.5, opacity: 0.6 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0 rounded-full bg-neon/30 blur-md"
        />
      )}
      <svg viewBox="0 0 52 52" className="h-24 w-24">
        <m.circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="var(--color-neon)"
          strokeWidth="2.5"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        />
        <m.path
          d="M15 27 l7.5 7.5 L38 18"
          fill="none"
          stroke="var(--color-neon)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: reduce ? 0 : 0.35, duration: reduce ? 0 : 0.35, ease: EASE }}
        />
      </svg>
    </div>
  );
}
