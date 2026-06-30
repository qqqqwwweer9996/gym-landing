import type { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-neon">
        {kicker}
      </span>
      <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-fg sm:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg text-mute">{children}</p>}
    </div>
  );
}
