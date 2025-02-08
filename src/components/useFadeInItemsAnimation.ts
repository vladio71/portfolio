import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const useFadeInItemsAnimation = (className, duration = 0.8) => {
  useEffect(() => {
    // const blocks = gsap.utils.toArray("." + className);
    // gsap.set(blocks, {
    //   y: 50,
    //   opacity: 0,
    //   scale: 0.97,
    //   transition: 0,
    //   willChange: "transform",
    // });
    ScrollTrigger.batch("." + className, {
      batchMax: 4,
      start: "top 90%",

      onEnter: (elements, triggers) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.125,
          duration,
          lazy: false,
        });
      },
    });
  }, []);
};

export default useFadeInItemsAnimation;
