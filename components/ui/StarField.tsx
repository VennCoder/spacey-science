"use client";
import { useEffect, useState } from "react";

interface Star {
  width: number;
  height: number;
  top: number;
  left: number;
  opacity: number;
}

export function StarField({ count = 80 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, () => ({
        width: Math.random() * 3 + 1,
        height: Math.random() * 3 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: Math.random() * 0.7 + 0.1,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: star.width,
            height: star.height,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}