"use client";

import { m } from "framer-motion";
import type { Plan } from "@/types";

const won = (n: number) => n.toLocaleString("ko-KR");

export function PriceCard({
  plan,
  selected,
  onSelect,
  onStart,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
  /** 이미 선택된 카드를 다시 누르면 결제 플로우 시작 */
  onStart: () => void;
}) {
  return (
    <m.button
      type="button"
      onClick={selected ? onStart : onSelect}
      // tap 마이크로 인터랙션 — transform만
      whileTap={{ scale: 0.98 }}
      className={`group relative flex h-full flex-col rounded-2xl border bg-surface p-7 text-left transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 ${
        selected
          ? "border-neon/60"
          : "border-line hover:border-neon/40"
      }`}
    >
      {/* 선택 하이라이트: layoutId 공유 → 카드 사이를 부드럽게 이동 */}
      {selected && (
        <m.span
          layoutId="plan-highlight"
          className="glow-neon pointer-events-none absolute inset-0 rounded-2xl"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}

      {plan.featured && (
        <span className="mb-4 inline-flex w-fit rounded-full bg-neon/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-neon">
          인기
        </span>
      )}

      <h3 className="text-lg font-bold tracking-wide text-fg">{plan.name}</h3>
      <p className="mt-1 text-sm text-mute">{plan.blurb}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-fg">
          ₩{won(plan.price)}
        </span>
        <span className="text-sm text-mute">/ {plan.period}</span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-fg/90">
            <span className="mt-0.5 text-neon">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <span
        className={`mt-7 rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors duration-300 ${
          selected
            ? "bg-neon text-ink"
            : "bg-surface-2 text-fg group-hover:bg-neon/15 group-hover:text-neon"
        }`}
      >
        {selected ? "이 플랜으로 시작하기" : "선택하기"}
      </span>
    </m.button>
  );
}
