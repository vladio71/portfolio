import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const useFadeInAnimation = (duration = 1) => {
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      gsap.set(node, {
        opacity: 0,
        transition: 0,
        y: +100,
      });
      let anim = gsap.to(node, {
        opacity: 1,
        delay: 0.2,
        y: 0,
        duration,
        ease: "expoScale(0.5,7,none)",
        paused: true,
      });

      ScrollTrigger.create({
        trigger: node,
        start: "top 100%",
        onEnter: () => {
          anim.play();
        },
      });
    }
  }, []);

  return measuredRef;
};

export default useFadeInAnimation;
