import React, { useState } from "react";
import css from "./work.module.css";
import Workplace from "./Workplace";
import Heading from "../common/Heading";
import CaseIcon from "./CaseIcon";
import cn from "@/utils/classNames";

const WorkExperience = () => {
  const [hoveredItemId, setHoveredItemId] = useState(-1);

  return (
    <section>
      <Heading id="experience" className="fadeIn">
        Experience
      </Heading>
      <div className={cn(css.wrapper)}>
        <div className={cn(css.crossLine, "fadeIn")}></div>
        <div className={cn(css.crossLineArrow)}></div>
        {/* <Workplace
          id={1}
          left={true}
          className={[css.item2]}
          workTitle="Fullstack Developer"
          dates="May 2023 – September 2024"
          company="Your New Company"
          setHoveredItemId={setHoveredItemId}
          achiveStack={[
            "Engineered an optimized data retrieval system for a complex user management dashboard, implementing advanced pagination and sorting on deeply related Postgres tables with NestJS to ensure high performance at scale.",
            "Developed a CMS data parsing pipeline integrated with a web administration dashboard, enabling seamless content editing and mobile app control for non-technical users using React, React Native, and NestJS.",
            "Created a full-stack real-time chat system with Socket.io, supporting both one-to-one and group messaging, built with Next.js and Express.",
            "Built and optimized high-performance pages in React and React Native, featuring smooth animations, efficient caching, and reliable state management—meticulously aligned with Figma designs and client requirements.",
            "Resolved cross-platform integration issues on iOS and Android, managed TestFlight builds, streamlined AWS S3 file uploads, and ensured stable project environments using Docker.",
            "Integrated Facebook and Instagram authentication and enabled in-app video uploads directly to user profiles.",
            "Implemented custom PDF viewing, filtering logic, and estate update management for a estate marketing project integrated with a Strapi backend.",
          ]}
          stack={[
            "NestJS",
            "PostgreSQL",
            "React",
            "Next.js",
            "React Native",
            "Express",
            "Socket.io",
            "Strapi",
            "Docker",
            "AWS S3",
          ]}
        ></Workplace> */}
        <Workplace
          id={1}
          left={true}
          className={[css.item1]}
          workTitle="Fullstack Developer"
          dates={"January 2025 - present"}
          company={"Insiders"}
          setHoveredItemId={setHoveredItemId}
          achiveStack={[
            "Engineered an optimized data retrieval system for a complex user management dashboard, implementing advanced pagination and sorting on deeply related Postgres tables with NestJS to ensure high performance at scale.",
            "Developed a CMS data parsing pipeline integrated with a web administration dashboard, enabling seamless content editing and mobile app control for non-technical users using React, React Native, and NestJS.",
            "Created a full-stack real-time chat system with Socket.io, supporting both one-to-one and group messaging, built with Next.js and Express.",
            "Built and optimized high-performance pages in React and React Native, featuring smooth animations, efficient caching, and reliable state management—meticulously aligned with Figma designs and client requirements.",
            "Resolved cross-platform integration issues on iOS and Android, managed TestFlight builds, streamlined AWS S3 file uploads, and ensured stable project environments using Docker.",
            "Integrated Facebook and Instagram authentication and enabled in-app video uploads directly to user profiles.",
            "Implemented custom PDF viewing, filtering logic, and estate update management for a estate marketing project integrated with a Strapi backend.",
          ]}
          stack={[
            "NestJS",
            "PostgreSQL",
            "React",
            "Next.js",
            "React Native",
            "Express",
            "Socket.io",
            "Strapi",
            "Docker",
            "AWS S3",
          ]}
        ></Workplace>
        {/* <Workplace
          id={1}
          left={true}
          className={[css.item1]}
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
        ></Workplace> */}
        <CaseIcon
          id={1}
          className={cn(css.icon1, css.boxIcon)}
          hoveredItemId={hoveredItemId}
        />
        <CaseIcon
          id={2}
          className={cn(css.icon2, css.boxIcon)}
          hoveredItemId={hoveredItemId}
        />
        <Workplace
          id={2}
          // left={false}
          className={[css.item2]}
          imageHeight={800}
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
        {/* <Workplace
          id={2}
          className={css.item2}
          setHoveredItemId={setHoveredItemId}
          workTitle="Next"
          company="Step"
          achiveStack={["Cool Job!"]}
        ></Workplace> */}
      </div>
    </section>
  );
};

export default WorkExperience;
