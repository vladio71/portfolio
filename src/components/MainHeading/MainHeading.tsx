import React, { useEffect, useReducer, useRef } from "react";
import css from "@/styles/Home.module.css";
import gsap from "gsap";

const MainHeading = ({ triggerAnimation }) => {
  const mainHeadingRef = useRef<HTMLElement>();

  useEffect(() => {
    if (triggerAnimation == 1) {
      const timelineOptions = {
        duration: 1,
        stagger: {
          amount: 0.4,
          ease: "sine.out",
        },
      };
      const allHeadingLines =
        mainHeadingRef.current.querySelectorAll(".meSection");

      gsap.to(allHeadingLines, {
        ...timelineOptions,
        delay: 1,
        opacity: 1,
        y: -80,
        ease: "sine.out",
        overwrite: "auto",
      });
    }
  }, [triggerAnimation]);

  return (
    <section ref={mainHeadingRef} className={css.heading}>
      <div className={`meSection`} style={{ marginTop: "15vw" }}>
        Vlad Dobrinov,
      </div>

      <div className={`meSection`}>highly driven</div>
      <div className={`meSection`}>FullStack Dev</div>
    </section>
  );
};

export default MainHeading;
