import type { NavItem, Plan, Program } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "프로그램", href: "#programs" },
  { label: "요금제", href: "#pricing" },
  { label: "체험 신청", href: "#cta" },
];

// Pexels 이미지: 가로 카드용 w=800. 라이선스 = 상업적 사용·출처표기 불필요.
const px = (id: number, w: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const PROGRAMS: Program[] = [
  {
    id: "strength",
    title: "STRENGTH LAB",
    blurb: "프리웨이트로 제대로 된 근력을. 자세 코칭까지 1:1로 챙겨드려요.",
    tag: "근력",
    image: px(1092872, 800), // 바벨 그립
  },
  {
    id: "hiit",
    title: "METCON HIIT",
    blurb: "단 20분, 고강도 인터벌로 심폐와 체지방을 한 번에 잡습니다.",
    tag: "유산소",
    image: px(7688862, 800), // 플라이오메트릭 트레이닝
  },
  {
    id: "mobility",
    title: "MOBILITY FLOW",
    blurb: "가동성과 코어를 다잡아 부상 없이 오래 가는 몸을 만듭니다.",
    tag: "회복",
    image: px(16131142, 800), // 매트 스트레칭
  },
  {
    id: "boxing",
    title: "BOXING BURN",
    blurb: "복싱 동작으로 전신을 깨우는, 가장 신나는 그룹 클래스.",
    tag: "그룹",
    image: px(8736743, 800), // 복싱 실루엣
  },
];

export const PLANS: Plan[] = [
  {
    id: "day",
    name: "DAY PASS",
    price: 18000,
    period: "1일",
    blurb: "일단 한번 와서 둘러보고 싶다면.",
    features: ["전 시설 1일 이용", "샤워·라커 포함", "그룹 클래스 1회"],
  },
  {
    id: "month",
    name: "MONTHLY",
    price: 119000,
    period: "월",
    blurb: "대부분 이 플랜을 선택해요.",
    features: [
      "헬스 무제한 이용",
      "그룹 클래스 무제한",
      "체성분 측정 월 2회",
      "전용 앱 루틴 제공",
    ],
    featured: true,
  },
  {
    id: "pt",
    name: "PT PRO",
    price: 320000,
    period: "월",
    blurb: "전담 코치와 확실하게 결과를 내고 싶다면.",
    features: [
      "MONTHLY 혜택 모두 포함",
      "1:1 PT 주 2회",
      "맞춤 식단 코칭",
      "예약 우선권",
    ],
  },
];
