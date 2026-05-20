import { useRef, useLayoutEffect, useState, useMemo } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useRawValue,
  useResolvedValue,
  useScroll,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  MotionValue,
} from "motion/react";

import "./LogoLoop.css";

interface LogoItem {
  node: React.ReactNode;
  title?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  pauseOnHover?: boolean;
}

const LogoLoop = ({
  logos,
  speed = 1,
  direction = "left",
  gap = 40,
  pauseOnHover = true,
}: LogoLoopProps) => {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // We need to duplicate the items to make the loop seamless
  // Calculation: duplicate enough to fill the container width twice
  useLayoutEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 2);
    }
  }, [logos, gap]);

  useAnimationFrame((t, delta) => {
    let moveBy = direction === "left" ? -speed : speed;
    
    // Convert to pixels per frame roughly
    moveBy *= (delta / 16);

    baseX.set(baseX.get() + moveBy);
    
    // Wrap around for seamless loop
    if (contentWidth > 0) {
      const x = baseX.get();
      if (direction === "left" && x <= -contentWidth) {
        baseX.set(x + contentWidth);
      } else if (direction === "right" && x >= 0) {
        baseX.set(x - contentWidth);
      }
    }
  });

  return (
    <div className="logo-loop-container">
      <motion.div 
        className="logo-loop-content"
        ref={containerRef}
        style={{ 
          x: baseX,
          gap: `${gap}px`
        }}
      >
        {/* Render twice for seamless loop */}
        {[...logos, ...logos, ...logos, ...logos].map((item, idx) => (
          <div key={idx} className="logo-item">
            {item.node}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoLoop;
