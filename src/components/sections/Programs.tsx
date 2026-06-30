"use client";

import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { PROGRAMS } from "@/lib/data";

export function Programs() {
  return (
    <section id="programs" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading kicker="Programs" title="내 목표에 맞는 프로그램으로">
            초보부터 상급자까지, 네 가지 시그니처 프로그램 중에 골라 시작하세요.
          </SectionHeading>
        </Reveal>

        {/* stagger 컨테이너 → 카드가 순차로 등장 */}
        <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((p) => (
            <RevealItem key={p.id}>
              <article className="group h-full overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-neon/50">
                <div className="overflow-hidden">
                  {/* hover 시 이미지만 zoom — transform이라 페인트/레이아웃 영향 없음 */}
                  <SmartImage
                    src={p.image}
                    alt={p.title}
                    width={600}
                    height={420}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-fg">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    {p.blurb}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
