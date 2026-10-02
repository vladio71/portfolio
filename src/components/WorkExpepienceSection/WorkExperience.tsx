import React, { useState } from "react";
import css from "./work.module.css";
import Workplace from "./Workplace";
import Heading from "../common/Heading";
import CaseIcon from "./CaseIcon";
import cn from "@/utils/classNames";

type WorkplaceData = {
  workTitle: string;
  company: string;
  dates: string;
  achievements: string[];
  stack: string[];
};

// Newest first. Cards alternate sides of the timeline, so the grid in
// work.module.css has one `itemN` / `iconN` area per entry: add a row there
// when adding a workplace here.
const workplaces: WorkplaceData[] = [
  {
    workTitle: "Backend Developer",
    company: "VaslyDev",
    dates: "September 2025 - present",
    achievements: [
      "Built the enrichment pipeline on AWS Step Functions and Lambda: it calls third-party REST APIs under strict rate limits, with retries on every step, exponential backoff and dead-letter queues.",
      "Split the backend into the main app and the enrichment workers, each with its own database: workers run 20 concurrent Lambdas fed from SQS, about 20k entities per run, without slowing the app.",
      "Made Stripe billing safe at 30+ concurrent webhook events/sec with two-layer idempotency, so credits are never granted twice or lost.",
      "Ended recurring production DB failures under peak load: traced them via CloudWatch to concurrent CSV pipeline runs and added a load tracking table that limits them.",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "AWS Lambda",
      "Step Functions",
      "SQS",
      "Stripe",
    ],
  },
  {
    workTitle: "Full-Stack Engineer",
    company: "Insiders",
    dates: "January 2025 - September 2025",
    achievements: [
      "Rebuilt per-seller sales analytics of a multi-seller e-commerce platform: replaced failing ORM-generated queries with raw SQL (5 to 7 joins) and cached hot results in Redis.",
      "Scaled real-time chat to 1,000+ concurrent WebSocket connections on one 4-core EC2 instance: three PM2-managed Node processes with Redis pub/sub between them.",
      "Reconciled separate web and mobile Stripe checkout flows into a single subscription state.",
      "Set up GitHub Actions CI/CD with separate dev and prod pipelines.",
    ],
    stack: [
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Socket.io",
      "React Native",
      "AWS EC2",
    ],
  },
  {
    workTitle: "Full-Stack Developer",
    company: "Fernir",
    dates: "March 2023 - December 2024",
    achievements: [
      "Designed and built the GraphQL API as one API for three clients: a mobile marketplace app, a customer web app and an internal staff app.",
      "Cut infrastructure costs by 25% with a hybrid backend: NestJS for core logic, AWS Lambda for async and spiky workloads.",
      "Cut routine engineer involvement in content updates from 6-8 hours a week to under 1 hour with an HTML-to-React-Native rendering pipeline.",
      "Migrated a legacy Angular app to Next.js; added Git pre-commit hooks and linting, cutting code review turnaround by 30%.",
    ],
    stack: [
      "NestJS",
      "GraphQL",
      "AWS Lambda",
      "Redis",
      "Next.js",
      "React Native",
    ],
  },
  {
    workTitle: "Full-Stack Developer",
    company: "Freelance",
    dates: "January 2022 - March 2023",
    achievements: [
      "Built and deployed web applications for 8+ small business clients on React, Node.js and PostgreSQL.",
      "Built a 3D project on the Autodesk API for an outside client.",
      "Automated recurring data and deployment tasks with Python.",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Python", "Autodesk API"],
  },
];

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
        {workplaces.map((workplace, index) => {
          const id = index + 1;
          const isLeft = index % 2 === 0;

          return (
            <React.Fragment key={workplace.company}>
              <Workplace
                id={id}
                left={isLeft}
                imageHeight={isLeft ? undefined : 800}
                className={css[`item${id}`]}
                workTitle={workplace.workTitle}
                dates={workplace.dates}
                company={workplace.company}
                setHoveredItemId={setHoveredItemId}
                achiveStack={workplace.achievements}
                stack={workplace.stack}
              />
              <CaseIcon
                id={id}
                className={cn(css[`icon${id}`], css.boxIcon)}
                hoveredItemId={hoveredItemId}
              />
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default WorkExperience;
