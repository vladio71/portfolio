import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const CUSTOM_HASH = "-sth";
const useCustomHashScroll = (start) => {
  const router = useRouter();
  const hashTargetStore = useRef<Element>();
  const prevId = useRef<string>();

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    window.addEventListener("beforeunload", () => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        prevId.current = target.id;
        target.id += CUSTOM_HASH;
        hashTargetStore.current = target;
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }
  }, []);

  useEffect(() => {
    if (start && window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(
          window.location.hash + CUSTOM_HASH
        );
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: "smooth" });

          target.id = prevId.current;
          prevId.current = null;
        }
      }, 1600);
    }
  }, [start]);
};

export default useCustomHashScroll;
