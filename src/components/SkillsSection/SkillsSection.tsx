import React from "react";
import css from "./skills.module.sass";
import { FaReact, FaNode } from "react-icons/fa";
import {
  SiAmazonaws,
  SiDocker,
  SiExpo,
  SiGraphql,
  SiJavascript,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiStripe,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";

const data = [
  {
    icon: <SiTypescript />,
    name: "TypeScript",
  },
  {
    icon: <SiJavascript />,
    name: "JavaScript",
  },
  {
    icon: <FaNode />,
    name: "Node.js",
  },
  {
    icon: <SiNestjs />,
    name: "NestJS",
  },
  {
    icon: <SiPostgresql />,
    name: "PostgreSQL",
  },
  {
    icon: <SiRedis />,
    name: "Redis",
  },
  {
    icon: <SiAmazonaws />,
    name: "AWS",
  },
  {
    icon: <SiDocker />,
    name: "Docker",
  },
  {
    icon: <FaReact />,
    name: "React",
  },
  {
    icon: <SiNextdotjs />,
    name: "Next.js",
  },
  {
    icon: <SiExpo />,
    name: "Expo",
  },
  {
    icon: <SiThreedotjs />,
    name: "Three.js",
  },
  {
    icon: <SiGraphql />,
    name: "GraphQL",
  },
  {
    icon: <SiPython />,
    name: "Python",
  },
  {
    icon: <SiStripe />,
    name: "Stripe",
  },
];

const SkillsSection = () => {
  return (
    <div className={`${css.wrapper} fadeIn`} id={"skills"}>
      <div className={css.skills}>
        {data.map((skill) => {
          return (
            <div key={skill.name} className={css.skills_item}>
              {skill.icon}
              {skill.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
