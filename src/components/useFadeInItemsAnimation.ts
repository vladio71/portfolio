import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const useFadeInItemsAnimation = (className: string, duration = 0.8) => {
  useEffect(() => {
    const triggers = ScrollTrigger.batch("." + className, {
      batchMax: 4,
      start: "top 90%",

      onEnter: (elements) => {
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

    // The sections below the fold are lazy chunks and their styles arrive after
    // this effect has run, so the first measurement is taken on a page that is
    // still much taller than the final one. Without a second measurement the
    // start positions of the lower blocks end up past the end of the page and
    // those blocks never fade in. Measure again whenever the page height
    // changes.
    let measuredHeight = document.body.offsetHeight;
    const observer = new ResizeObserver(() => {
      const height = document.body.offsetHeight;
      if (height === measuredHeight) return;

      measuredHeight = height;
      ScrollTrigger.refresh(true);
    });
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [className, duration]);
};

export default useFadeInItemsAnimation;
