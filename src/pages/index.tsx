"use client";

import Head from "next/head";
import css from "../styles/Home.module.css";
import React, { Suspense, lazy, useState } from "react";
import Navigation from "@/components/Navigation/Navigation";
import MainHeading from "@/components/MainHeading/MainHeading";
import cn from "@/utils/classNames";
import { inter, kanit, oswald } from "@/styles/fonts";
import CurtainOverlay from "@/components/CurtainOverlay/CurtainOverlay";
import useCustomHashScroll from "@/components/useCustomHashScroll";
import TreeJsBackground from "@/components/NewThreeJsWithFiber";
import useFadeInItemsAnimation from "@/components/useFadeInItemsAnimation";
import dynamic from "next/dynamic";

const ProjectsSection = lazy(
  () => import("../components/ProjectSection/ProjectsSection")
);
const WorkExperience = lazy(
  () => import("../components/WorkExpepienceSection/WorkExperience")
);
const GetInTouchSection = lazy(
  () => import("../components/GetInTouch/GetInTouchSection")
);
const AboutSection = lazy(
  () => import("../components/AboutSection/AboutSection")
);

const SkillsSection = dynamic(
  () => import("../components/SkillsSection/SkillsSection")
);

export default function Home() {
  const [triggerAnimation, setTriggerAnimation] = useState(0);

  const isReady = triggerAnimation == 1;
  useCustomHashScroll(isReady);
  useFadeInItemsAnimation("fadeIn");

  return (
    <div
      style={{
        position: "relative",
        inset: 0,
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Head>
        <title>Web Portfolio</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/portfolio.png" />
      </Head>

      <main
        className={cn(
          css.background,
          inter.variable,
          oswald.variable,
          kanit.className
        )}
      >
        <CurtainOverlay setTriggerAnimation={setTriggerAnimation} />
        <div
          style={{
            position: "relative",
          }}
        >
          <TreeJsBackground />
        </div>
        <div
          style={{
            height: "100vh",
            marginBottom: "10vh",
          }}
        >
          <Navigation triggerAnimation={triggerAnimation} />
          <MainHeading triggerAnimation={triggerAnimation} />
        </div>

        <Suspense key={"ABOUT"} fallback={<div>Loading...</div>}>
          <AboutSection />
        </Suspense>

        <Suspense key={"WORK"} fallback={<div>Loading...</div>}>
          <WorkExperience />
        </Suspense>

        <Suspense key={"SKILLS"} fallback={<div>Loading...</div>}>
          <SkillsSection />
        </Suspense>
        <Suspense key={"PROJECTS"} fallback={<div>Loading...</div>}>
          <ProjectsSection />
        </Suspense>
        <Suspense key={"CONTACT"} fallback={<div>Loading...</div>}>
          <GetInTouchSection />
        </Suspense>
        <footer className={css.footer} id="footer">
          <a href="https://github.com/vladio71/portfolio" target="_blank">
            Designed & Built by Vlad Dobrinov
          </a>
        </footer>
      </main>
    </div>
  );
}
