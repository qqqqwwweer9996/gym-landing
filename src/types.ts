export type Program = {
  id: string;
  title: string;
  blurb: string;
  tag: string;
  /** Pexels 이미지 URL (검증 완료) */
  image: string;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export type NavItem = { label: string; href: string };
