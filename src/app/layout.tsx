import type { Metadata } from "next";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "APEXFIT — 성수 24시 프리미엄 헬스장",
  description:
    "프리웨이트부터 컨디셔닝까지. 데이터로 관리하는 트레이닝. 첫 7일 무료 체험.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Hero 폰트 FOUT 억제용 preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* 전 페이지 LazyMotion 컨텍스트 (m 컴포넌트 활성화) */}
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
