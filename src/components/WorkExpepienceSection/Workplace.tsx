import React, { ReactNode } from "react";
import css from "./work.module.css";

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
}: {
  className: string;
  company: string;
  dates: string;
  workTitle: string;
  left?: boolean;
  stack?: Array<string>;
  achiveStack?: Array<string>;
  setHoveredItemId: Function;
}) => {
  return (
    <>
      <div
        className={`${className} ${css.shadowAnimation} ${left && css.left}`}
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
    </>
  );
};

export default Workplace;
