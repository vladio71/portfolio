import React, { useEffect, useRef } from "react";
import css from "../ProjectsSection.module.sass";
import Image from "next/image";
import useFadeInAnimation from "@/components/useFadeInAnimation";
import cn from "@/utils/classNames";

export type ArticleObject = {
  src: string;
  heading: string;
  description: string;
  techStack: string[];
  git: string;
  live: string;
};

const Article = ({ id, article }: { id: number; article: ArticleObject }) => {
  return (
    <>
      <div className={cn("fadeIn", css.project)}>
        <article
          id={"animation"}
          data-id={id}
          data-inviewport="fadein"
          className={css.project_section_article}
        >
          <div
            style={{
              width: "100%",
              height: "300px",
              position: "relative",
            }}
          >
            <Image
              alt={"projectImage"}
              src={article.src}
              priority={true}
              fill={true}
            />
          </div>

          <div className={css.article_caption}>
            <h3
              style={{
                fontSize: "1.2rem",
              }}
            >
              {article.heading}
            </h3>

            <div>
              {article.description}
              <div>
                {!article.techStack ||
                  article.techStack.map((skill) => (
                    <span key={skill}>{skill} </span>
                  ))}
              </div>
            </div>

            <div>
              <a className={css.button} href={article.live} target={"_blank"}>
                Live
              </a>
              <a className={css.button} href={article.git} target={"_blank"}>
                Github
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Article;
