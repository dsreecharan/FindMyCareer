import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedScore({ score }) {
  const scoreRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      scoreRef.current,
      { textContent: 0 },
      {
        duration: 2,
        textContent: score,
        roundProps: "textContent",
        ease: "power2.out",
      }
    );
  }, [score]);

  return (
    <div className="score-display">
      <span ref={scoreRef}>0</span>%
    </div>
  );
} 