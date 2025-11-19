'use client';

import { useEffect, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function CountUp({ 
  end, 
  duration = 2000, 
  decimals = 0,
  suffix = '',
  prefix = ''
}: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      
      const currentCount = progress === 1 ? end : end * easeOutQuart(progress);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  const formattedCount = count.toFixed(decimals);

  return (
    <span>
      {prefix}{formattedCount}{suffix}
    </span>
  );
}

