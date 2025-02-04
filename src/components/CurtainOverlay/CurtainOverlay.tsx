import { useEffect, useRef } from "react";
import css from "./curtain.module.css";
import gsap from "gsap";
import cn from "@/utils/classNames";
import { overlay } from "three/examples/jsm/nodes/Nodes.js";

const CurtainOverlay = ({ setTriggerAnimation }) => {
  const overlayDiv = useRef();
  const ldiv = useRef();
  const rdiv = useRef();

  useEffect(() => {
    gsap
      .to(ldiv.current, {
        background: "rgb(240, 249, 254)",
        ease: "sine.out",
        duration: 1,
      })
      .then(() => {
        setTriggerAnimation(1);
      });
    gsap.to(rdiv.current, {
      background: "rgb(240, 249, 254)",
      ease: "sine.out",
      duration: 1,
    });

    gsap.to(overlayDiv.current, {
      delay: 1,
      rotate: -120,
      transformOrigin: "center",
      ease: "sine.out",
      duration: 3,
    });

    gsap.to(ldiv.current, {
      delay: 1,
      ease: "sine.out",
      background: "white",
      duration: 1,
      opacity: 0,
    });

    gsap.to(rdiv.current, {
      delay: 1,
      ease: "sine.out",
      background: "white",
      duration: 1,
      opacity: 0,
    });

    gsap.to(ldiv.current, {
      delay: 1,
      left: "-100%",
      ease: "sine.out",
      duration: 4,
    });

    gsap.to(rdiv.current, {
      delay: 1,
      right: "-100%",
      ease: "sine.out",
      duration: 4,
    });
  }, []);

  return (
    <div ref={overlayDiv} className={css.wrap}>
      <div ref={ldiv} className={cn(css.curtain, css.letf)} />
      <div ref={rdiv} className={cn(css.curtain, css.right)} />
    </div>
  );
};

export default CurtainOverlay;
