import React, { useEffect, useRef } from "react";
import css from "./ProjectsSection.module.sass";
import { initialData } from "../../../initialData";
import Article, {
  ArticleObject,
} from "@/components/ProjectSection/Article/Article";
import Heading from "../Heading";
import cn from "@/utils/classNames";
import useGsapAndThreeJsAnimation from "./useGsapAndThreeJsAnimation";

const ProjectsSection = ({ ballGameStage, setBallGameStage }) => {
  const { handleAnimation, sceneRef, paperPlane } =
    useGsapAndThreeJsAnimation();

  useEffect(() => {
    handleAnimation();
  }, [sceneRef.current]);

  return (
    <>
      <Heading id="projects">Awesome Projects</Heading>
      <div className={css.circleGameLine}>
        <div ref={sceneRef} className={css.threeJSScene} />
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
