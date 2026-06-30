"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect } from "react";
import { NAV_ITEMS } from "@/lib/data";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
};

export function MobileMenu({ open, onClose, onNavigate }: Props) {
  useLockBodyScroll(open);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* 백드롭 */}
          <button
            aria-label="메뉴 닫기"
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          {/* 패널 — 오른쪽에서 슬라이드 */}
          <m.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-72 flex-col gap-1 border-l border-line bg-surface p-6 pt-24"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate(item.href)}
                className="rounded-xl px-4 py-3 text-left text-xl font-semibold text-fg transition-colors hover:bg-surface-2 hover:text-neon"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate("#pricing")}
              className="glow-neon mt-4 rounded-full bg-neon px-5 py-3 font-semibold text-ink"
            >
              지금 등록하기
            </button>
          </m.nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
