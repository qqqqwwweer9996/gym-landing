import { NAV_ITEMS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-neon text-ink">
              ▲
            </span>
            APEX<span className="text-neon">FIT</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-mute">
            서울 성동구 성수동 12-34
            <br />
            24시간 운영 · 연중무휴
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-fg">바로가기</h4>
          <ul className="mt-4 space-y-2">
            {NAV_ITEMS.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  className="text-sm text-mute transition-colors hover:text-neon"
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-fg">연락</h4>
          <ul className="mt-4 space-y-2 text-sm text-mute">
            <li>02-1234-5678</li>
            <li>hello@apexfit.kr</li>
            <li>@apexfit_seongsu</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6 text-xs text-mute/70">
        © 2026 APEXFIT. 포트폴리오 데모 — 가상의 브랜드입니다.
      </div>
    </footer>
  );
}
