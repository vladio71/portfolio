import React, { useState } from "react";
import css from "./work.module.css";
import Workplace from "./Workplace";
import Heading from "../Heading";
import CaseIcon from "./CaseIcon";
import cn from "@/utils/classNames";


const WorkExperience = () => {
  const [hoveredItemId, setHoveredItemId] = useState(-1);


  return (
    <section>
      <Heading id="experience">Experience</Heading>
      <div className={css.wrapper}>
        <div className={css.crossLine}></div>
        <div className={css.crossLineArrow}></div>
        <Workplace
          id={1}
          left={true}
          className={css.item1}
          workTitle="Frontend Developer"
          dates={"September 2024 - present"}
          company={"Fernir"}
          setHoveredItemId={setHoveredItemId}
          achiveStack={[
            "Developed and maintained web applications, primarily using Next.js and Angular, while also supporting legacy JavaScript code.",
            "Collaborated with frontend and backend teams to identify and implement solutions for migrating from Angular to Next.js.",
            "Troubleshot and debugged code to ensure optimal performance and resolve issues.",
            "Wrote and maintained Git scripts for linting and code formatting",
            "Created custom components from scratch and adapted existing library components to meet project-specific requirements.",
            "Conducted code reviews to ensure code quality",
            "Collaborated with team members to solve complex issues, engaging in discussions and pair programming.",
          ]}
          stack={[
            "JavaScript",
            "TypeScript",
            "Tailwind",
            "ReactJs",
            "NextJs",
            "Angular",
          ]}
        ></Workplace>
        <CaseIcon id={1} className={cn(css.icon1,css.boxIcon)} hoveredItemId={hoveredItemId} />
        <CaseIcon id={2} className={cn(css.icon2,css.boxIcon)} hoveredItemId={hoveredItemId} />
        <Workplace
          id={2}
          className={css.item2}
          setHoveredItemId={setHoveredItemId}
          workTitle="Next"
          company="Step"
          achiveStack={["Cool Job!"]}
        ></Workplace>
      </div>
    </section>
  );
};

export default WorkExperience;
