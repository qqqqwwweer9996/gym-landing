# APEXFIT — 헬스장 랜딩 페이지

스크롤 인터랙션과 성능 좋은 애니메이션 구현에 초점을 맞춘 **포트폴리오 데모입니다.**
브랜드(APEXFIT)와 콘텐츠는 모두 가상이며, 디자인보다는 **인터랙션과 성능 구현력**을 보여드리기 위한 작업물입니다.

🔗 로컬 실행: `npm run dev` → http://localhost:3040

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
```

## 스택

| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | **Next.js (App Router) + TypeScript** | `next/image`로 CLS 방어가 깔끔하고, 이미지 최적화가 내장되어 있습니다 |
| 스타일 | **Tailwind CSS v4** | `@theme` 토큰으로 다크+네온 팔레트를 일원화했습니다 |
| 애니메이션 | **Framer Motion** (필요한 곳에만) | CSS로 구현하기 어려운 곳에만 선택적으로 사용했습니다 — 아래 참고 |

## 핵심 인터랙션

- **Hero 패럴랙스** — `useScroll` + `useTransform`을 사용했습니다. 스크롤 진행도(0→1)를 배경·콘텐츠 레이어에 서로 다른 속도로 매핑해 깊이감을 줍니다. `MotionValue`로 처리해 **React 리렌더 없이** DOM transform만 갱신하므로 60fps를 유지합니다.
- **섹션 등장** — `IntersectionObserver` 커스텀 훅(`useIntersectionReveal`)을 직접 구현했습니다. 트리거 후 `unobserve`로 정리하며, 카드 그리드는 `staggerChildren`으로 순차 등장합니다.
- **요금제 선택** — 선택 하이라이트(네온 글로우)가 `layoutId` 공유를 통해 카드 사이를 부드럽게 이동합니다.
- **결제 플로우** — 선택된 카드를 누르면 확인 모달이 열립니다. `review → processing → done` 상태 머신으로, 패널이 스프링으로 등장한 뒤 버튼이 스피너로 모핑되고, 마지막에 SVG 체크마크가 `pathLength`로 그려지며 네온 버스트가 더해집니다.
- **모바일 메뉴** — `AnimatePresence` 슬라이드 패널과 백드롭 블러, body 스크롤 락, ESC·백드롭 닫기를 갖췄습니다.
- **부드러운 네비게이션** — 앵커 클릭 시 sticky 헤더 높이만큼 offset을 보정합니다.

## 설계에서 신경 쓴 부분

**애니메이션 라이브러리 vs CSS — 기준을 갖고 혼용했습니다**
- hover·색상·그림자 같은 단순 상태 전이는 **CSS transition**으로 처리했습니다 (JS 비용 0, GPU 합성).
- 스크롤 연동 보간처럼 CSS로 표현하기 어려운 부분에만 **Framer Motion**을 사용했습니다.
- `LazyMotion` + `m` 컴포넌트로 코어만 로드해 초기 번들을 줄였습니다.

**60fps**
- 애니메이션은 `transform`·`opacity`만 사용했습니다 (레이아웃·페인트를 유발하는 속성은 피했습니다).
- 스크롤 값은 `MotionValue`로 처리해 리렌더를 우회합니다.
- IntersectionObserver는 한 번 트리거된 뒤 `unobserve`합니다.

**CLS 최소화**
- `SmartImage`(next/image 래퍼)가 `aspect-ratio` 박스로 로드 전에 공간을 예약해 레이아웃 점프를 없앱니다. 로딩 중에는 shimmer 스켈레톤을 보여줍니다.
- 등장 애니메이션은 opacity·transform만 사용해 레이아웃에 영향을 주지 않습니다.

**접근성**
- `prefers-reduced-motion`을 구독(`usePrefersReducedMotion`)하여, 설정이 켜져 있으면 모든 모션을 즉시 표시하고 결제 지연 시간도 단축합니다.
- 모달에는 포커스 이동, ESC·백드롭 닫기, `aria-modal`을 적용했습니다.

## 구조

```
src/
├─ app/                 layout · page(서버 컴포넌트) · globals.css(테마 토큰)
├─ components/
│  ├─ layout/           Navbar · MobileMenu
│  ├─ sections/         Hero · Programs · Pricing · CTA · Footer
│  └─ ui/               SmartImage · Reveal · PriceCard · PlanConfirmModal · MotionProvider …
├─ hooks/               useIntersectionReveal · useSmoothScrollTo · useLockBodyScroll · usePrefersReducedMotion
├─ lib/                 data.ts(콘텐츠 한 파일) · motion.ts(variants 프리셋)
└─ types.ts
```

콘텐츠(프로그램·요금제·네비게이션)는 `lib/data.ts` 한 곳에서 관리하므로, 섹션 컴포넌트는 레이아웃에만 집중합니다.

## 이미지

[Pexels](https://www.pexels.com/license/)의 무료 이미지를 사용했습니다. **상업적 사용이 가능하며 출처 표기가 필요하지 않습니다.**
URL은 `images.pexels.com/photos/{id}/...` 형태의 결정적 패턴이라 `lib/data.ts`의 `px(id, w)` 헬퍼로 관리하고,
`next.config.ts`의 `images.remotePatterns`에 도메인을 등록해 `next/image` 최적화를 거칩니다.
실제 운영 시에는 자체 촬영본이나 유료 이미지로 교체하시면 됩니다.

---

봐주셔서 감사합니다. 문의나 피드백은 언제든 환영합니다.
