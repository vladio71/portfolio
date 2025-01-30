import React, { useEffect, useRef } from "react";
import css from "./ProjectsSection.module.sass";
import { initialData } from "../../../initialData";
import Article, {
  ArticleObject,
} from "@/components/ProjectSection/Article/Article";
import Heading from "../Heading";
import cn from "@/utils/classNames";
import useAnimationProjectSection from "./useAnimationProjectSection";

const ProjectsSection = ({ ballGameStage, setBallGameStage }) => {
  const {
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
  } = useAnimationProjectSection(ballGameStage, setBallGameStage);

  useEffect(() => {
    if (svgRef.current) {
      cropSVG(svgRef.current);
      cropSVG(secondSvgRef.current);
    }
  }, []);

  useEffect(() => {
    handleAnimation();
  }, [ballGameStage, setBallGameStage]);

  return (
    <>
      <Heading id="projects">Awesome Projects</Heading>
      <div className={css.circleGameLine}>
        <div className={css.animationBox}>
          <svg
            ref={svgRef}
            className={css.hiddenPath}
            width="100%"
            height="100%"
            viewBox="-20 0 557 190"
            id="svg"
          >
            <path
              className={css.path}
              ref={firstPathRef}
              id="path"
              d="M 12.7723 -146.1844 Q 75.4345 -17.8783 209.2474 51.5415 A 1 1 -20 0 0 242.4718 17.1011 A 1 1 -20 0 0 208.3077 51.8835 Q 269.6744 132.7731 481.0465 146.2951"
              stroke="#FF0000"
              strokeWidth="0.1"
              fill="none"
            />
          </svg>
          <svg
            className={cn(css.svg2, css.hiddenPath)}
            ref={secondSvgRef}
            width="100%"
            height="100%"
            viewBox="-20 0 557 190"
            id="svg"
          >
            <path
              className={css.path}
              ref={secondPathRef}
              id="path2"
              d="M 12.7723 -146.1844 Q 75.4345 -17.8783 209.2474 51.5415 A 1 1 -20 0 0 242.4718 17.1011 A 1 1 -20 0 0 208.3077 51.8835 Q 269.6744 132.7731 481.0465 146.2951"
              stroke="#FF0000"
              strokeWidth="0.1"
              fill="none"
            />
          </svg>
          <div
            ref={circleRef}
            onMouseEnter={handleNextStage}
            style={{
              opacity: ballGameStage >= 0 ? 1 : 0,
            }}
            id="rect"
            className={css.circle}
          >
            <div
              ref={ringBellAnimationRef}
            >
              Click me!
            </div>
          </div>
        </div>
      </div>
      <div ref={paperPlane} className={css.paperPlane}>
        <img src="./paperPlane.png" alt="paperPlane" />
      </div>
      <svg
        className={cn(css.planePath, css.hiddenPath)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-144.1 -853.1 1960 1697"
      >
        <path
          id="plane"
          d="M -144 -853 Q -11 750 761 839 Q 1520 891 1350 370 Q 1184 12 863 494 Q 700 838 1495 644 Q 1694 501 1816 -259"
          stroke="#FF0000"
          strokeWidth="0.1"
          fill="none"
        />
      </svg>
      <section className={css.project_section}>
        {initialData.map((article: ArticleObject, id: number) => (
          <Article key={article.heading} article={article} id={id} />
        ))}
      </section>
    </>
  );
};

export default ProjectsSection;
