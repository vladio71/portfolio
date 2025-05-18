import React, { ReactNode, useEffect, useState } from "react";
import css from "./work.module.css";
import Image from "next/image";

const Workplace = ({
  id,
  className,
  left,
  company,
  dates,
  workTitle,
  stack,
  achiveStack,
  setHoveredItemId,
  imageHeight,
}: {
  id: number;
  className: string | Array<string>;
  company: string;
  workTitle: string;
  dates?: string;
  left?: boolean;
  stack?: Array<string>;
  achiveStack?: Array<string>;
  setHoveredItemId: Function;
  imageHeight?: number;
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 1400);
    };

    checkScreen(); // Initial check

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const isBigScreenAndImageHeight = !isSmallScreen && imageHeight;

  return (
    <div className={`${className}`}>
      <div className={css.back__container}>
        <Image
          src="/complete-smoke.webp"
          alt="smoke"
          // fill
          width={isBigScreenAndImageHeight ? 1000 : 1200}
          height={isBigScreenAndImageHeight ? 1000 : 1200}
          style={
            imageHeight && isSmallScreen
              ? {
                  transform: "rotate(0deg) translateY(-340px) scaleX(1.2)",
                }
              : !isSmallScreen && imageHeight
              ? {
                  transform:
                    "rotate(90deg) scaleY(1.33) translate(-180px, 170px)",
                }
              : {}
          }

          // className={css.image}
          // style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className={`fadeIn ${css.shadowAnimation} ${css.workplaceOpacity} ${
          left && css.left
        }`}
        onMouseEnter={() => setHoveredItemId(id)}
        onMouseLeave={() => setHoveredItemId(-1)}
      >
        <div className={css.article}>
          <h3 className={css.company}>{`${workTitle} · ${company}`} </h3>
          <h2 className={css.dates}>{dates} </h2>
          {achiveStack &&
            achiveStack.map((achivement) => (
              <div className={css.achivement} key={achivement}>
                {achivement}
              </div>
            ))}
          <div className={css.stackItems}>
            {stack &&
              stack.map((tech) => (
                <div className={css.stackItem} key={tech}>
                  {tech}
                </div>
              ))}
          </div>
        </div>
        <div className={css.arrow} />
      </div>
    </div>
  );
};

export default Workplace;
