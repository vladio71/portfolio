import { useRef } from "react";
import gsap from "gsap";

export enum AnimationsStages {
  notReady = -1,
  readyIdle,
  firstAnimation,
  secondIdle,
  secondAnimation,
  thirdIdle,
  startPlaneAnimation,
}

export default function useAnimationProjectSection(
  ballGameStage,
  setBallGameStage
) {
  const circleRef = useRef<HTMLDivElement>();
  const animationRef = useRef<any>();
  const svgRef = useRef<any>();
  const secondSvgRef = useRef<any>();
  const firstPathRef = useRef<any>();
  const secondPathRef = useRef<any>();
  const ringBellAnimationRef = useRef<any>();
  const paperPlane = useRef<any>();

  function handleAnimation() {
    if (circleRef.current && ballGameStage !== AnimationsStages.secondIdle) {
      if (ballGameStage == AnimationsStages.readyIdle) {
        setUpPathsAndStartRingAnimation();
      } else {
        cancelRignAnimation();
      }
      if (ballGameStage == AnimationsStages.firstAnimation) {
        firstAnimation();
      }
      if (ballGameStage == AnimationsStages.secondAnimation) {
        secondAnimation();
      }
    }
  }

  function cancelRignAnimation() {
    if (animationRef.current) animationRef.current.cancel();
    animationRef.current = null;
  }

  function setUpPathsAndStartRingAnimation() {
    gsap.set("#path2", {
      transformOrigin: "left top",
      rotate: 85,
    });
    gsap
      .set("#path", {
        transformOrigin: "left top",
        rotate: -5,
      })
      .then(() => {
        animationRef.current = ringBellAnimationRef.current.animate(
          rignAnimationKeyframes,
          ringAnimationSettings
        );
      });
  }

  function firstAnimation() {
    let anim = gsap.to(circleRef.current, {
      duration: 2,
      ease: "power1.inOut",
      motionPath: {
        path: "#path",
        align: "#path",
        autoRotate: 180,
        curviness: 1.5,
        alignOrigin: [0.5, 0.5],
        start: 1,
        end: 0,
      },
    });
    anim
      .then(() => {
        setBallGameStage(AnimationsStages.secondIdle);
        gsap.to(circleRef.current, {
          duration: 0.5,
          rotate: 0,
        });
      })
      .then(() => {
        animationRef.current = ringBellAnimationRef.current.animate(
          rignAnimationKeyframes,
          ringAnimationSettings
        );
      });
  }

  function secondAnimation() {
    cancelRignAnimation();
    gsap
      .to(circleRef.current, {
        duration: 0.5,
        rotate: 148,
      })
      .then(() => {
        gsap
          .set(circleRef.current, {
            transition: "0s",
          })
          .then(() => {
            gsap
              .to(circleRef.current, {
                duration: 2,
                ease: "power1.inOut",
                motionPath: {
                  path: "#path2",
                  align: "#path2",
                  autoRotate: true,
                  curviness: 1.5,
                  alignOrigin: [0.5, 0.5],
                },
              })
              .then(() => {
                setBallGameStage(AnimationsStages.thirdIdle);
                gsap
                  .to(circleRef.current, {
                    duration: 0.5,
                    rotate: 0,
                  })
                  .then(() => {
                    animationRef.current = ringBellAnimationRef.current.animate(
                      rignAnimationKeyframes,
                      ringAnimationSettings
                    );
                  });
              });
          });
      });
  }

  function planeAnimation() {
    gsap.to(circleRef.current, {
      duration: 0.3,
      opacity: 0,
      y: 800,
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    gsap.to(paperPlane.current, {
      duration: 1,
      opacity: 1,
    });
    gsap.to(paperPlane.current, {
      duration: 2.25,
      scale: 2,
      ease: "power1.inOut",
      motionPath: {
        path: "#plane",
        align: "#plane",
        autoRotate: true,
        curviness: 1.5,
        alignOrigin: [0.5, 0.7],
        type: "cubic",
      },
    });
    gsap.set(paperPlane.current, {
      opacity: 0,
    });
  }

  function handleNextStage() {
    if (ballGameStage == AnimationsStages.readyIdle) {
      setBallGameStage(AnimationsStages.firstAnimation);
    } else if (ballGameStage == AnimationsStages.secondIdle) {
      setBallGameStage(AnimationsStages.secondAnimation);
    } else if (ballGameStage == AnimationsStages.thirdIdle) {
      cancelRignAnimation();
      planeAnimation();
    }
  }

  function cropSVG(svgEl) {
    const bbox = svgEl.getBBox();
    svgEl.setAttribute(
      "viewBox",
      `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
    );
  }

  const rignAnimationKeyframes = {
    transform: [
      "rotate(0)",
      "rotate(30deg)",
      "rotate(-28deg)",
      "rotate(34deg)",
      "rotate(-32deg)",
      "rotate(30deg)",
      "rotate(-28deg)",
      "rotate(26deg)",
      "rotate(-24deg)",
      "rotate(22deg)",
      "rotate(-20deg)",
      "rotate(18deg)",
      "rotate(-16deg)",
      "rotate(14deg)",
      "rotate(-12deg)",
      "rotate(10deg)",
      "rotate(-8deg)",
      "rotate(6deg)",
      "rotate(-4deg)",
      "rotate(2deg)",
      "rotate(-1deg)",
      "rotate(1deg)",
      "rotate(0)",
      "rotate(0)",
    ],
    offset: [
      0.0, 0.01, 0.03, 0.05, 0.07, 0.09, 0.11, 0.13, 0.15, 0.17, 0.19, 0.21,
      0.23, 0.25, 0.27, 0.29, 0.31, 0.33, 0.35, 0.37, 0.39, 0.41, 0.43, 1,
    ],
  };
  const ringAnimationSettings = {
    duration: 4000,
    iterations: Infinity,
  };

  return {
    handleAnimation,
    handleNextStage,
    circleRef,
    animationRef,
    svgRef,
    secondSvgRef,
    firstPathRef,
    secondPathRef,
    ringBellAnimationRef,
    paperPlane,
    rignAnimationKeyframes,
    ringAnimationSettings,
    cropSVG,
  };
}
