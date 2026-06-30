"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  /** 실제 이미지 URL (Pexels). next.config의 remotePatterns에 도메인 등록 필요 */
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  /** 컨테이너 클래스 (aspect 박스) */
  wrapperClassName?: string;
  sizes?: string;
};

/**
 * next/image 래퍼.
 * - aspect-ratio 박스로 로드 전 공간 예약 → CLS 0
 * - 로딩 중 shimmer 스켈레톤
 * - Hero는 priority(=preload, fetchpriority high), 나머지는 lazy
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  wrapperClassName = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-surface-2 ${wrapperClassName}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* shimmer 스켈레톤: 로드되면 사라짐 */}
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 -translate-x-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              animation: "shimmer 1.4s infinite",
            }}
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
