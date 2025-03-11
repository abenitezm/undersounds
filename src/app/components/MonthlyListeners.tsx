"use client";

import { useState, useEffect } from "react";

const MonthlyListeners = ({
  value,
  duration = 1500,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  // Animación hecha con v0
  useEffect(() => {
    // Reset count when value changes
    setCount(0);

    // Don't animate if value is 0
    if (value === 0) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    // Use requestAnimationFrame for smoother animation
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic function: progress = 1 - (1 - progress)^3
      // This makes the animation start fast and slow down as it approaches the end
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easedProgress * value);
      setCount(currentValue);

      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setCount(value); // Ensure we end exactly at the target value
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  const formattedCount = count.toLocaleString();

  return <span>{formattedCount}</span>;
};

export default MonthlyListeners;
