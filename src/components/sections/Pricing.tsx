"use client";

import { useState } from "react";
import { PlanConfirmModal } from "@/components/ui/PlanConfirmModal";
import { PriceCard } from "@/components/ui/PriceCard";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PLANS } from "@/lib/data";

export function Pricing() {
  // 선택 상태의 단일 출처. 기본값은 featured 플랜.
  const [selected, setSelected] = useState(
    PLANS.find((p) => p.featured)?.id ?? PLANS[0].id
  );
  // 결제 플로우 대상 플랜 (null이면 모달 닫힘)
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const confirmingPlan = PLANS.find((p) => p.id === confirmingId) ?? null;

  return (
    <section id="pricing" className="border-t border-line bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading kicker="Membership" title="숨은 비용 없는 멤버십">
            언제든 변경하고 해지할 수 있어요. 카드를 눌러 비교해 보세요.
          </SectionHeading>
        </Reveal>

        <Reveal stagger className="grid items-stretch gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <RevealItem key={plan.id} className="h-full">
              <PriceCard
                plan={plan}
                selected={selected === plan.id}
                onSelect={() => setSelected(plan.id)}
                onStart={() => setConfirmingId(plan.id)}
              />
            </RevealItem>
          ))}
        </Reveal>

        <p className="mt-8 text-center text-sm text-mute">
          모든 플랜에 라커·샤워·와이파이 무료. 등록비도 없습니다.
        </p>
      </div>

      <PlanConfirmModal
        plan={confirmingPlan}
        onClose={() => setConfirmingId(null)}
      />
    </section>
  );
}
