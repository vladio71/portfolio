import Head from "next/head";
import css from "../styles/Home.module.css";
import React, { useEffect, useRef, useState } from "react";
import { lazy, Suspense } from "react";
import AboutSection from "@/components/AboutSection/AboutSection";
import SkillsSection from "@/components/SkillsSection/SkillsSection";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import Navigation from "@/components/Navigation/Navigation";
import MainHeading from "@/components/MainHeading/MainHeading";
import WorkExperience from "@/components/WorkExpepienceSection/WorkExperience";
import GetInTouchSection from "@/components/GetInTouch/GetInTouchSection";
import cn from "@/utils/classNames";
import { inter, kanit, oswald } from "@/styles/fonts";
import { relative } from "path";
import CurtainOverlay from "@/components/CurtainOverlay/CurtainOverlay";
import useFadeInItemsAnimation from "@/components/useFadeInItemsAnimation";
import { useParams, usePathname } from "next/navigation";
import useCustomHashScroll from "@/components/useCustomHashScroll";

const TreeJsBackground = lazy(() => import("@/components/TreeJsBackground"));

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
            // zIndex: 10,
            position: "relative",
          }}
        >
          <Suspense fallback={null}>
            <TreeJsBackground />
          </Suspense>
        </div>
        {/* <Suspense fallback={null}>
          <TreeJsBackground />
        </Suspense> */}
        <div
          style={{
            height: "100vh",
            marginBottom: "10vh",
          }}
        >
          <Navigation triggerAnimation={triggerAnimation} />
          <MainHeading triggerAnimation={triggerAnimation} />
        </div>

        <AboutSection />
        <WorkExperience />
        <SkillsSection />
        <ProjectsSection />
        <GetInTouchSection />
        <footer className={css.footer} id="footer">
          <a href="https://github.com/vladio71/portfolio" target="_blank">
            Designed & Built by Vlad Dobrinov
          </a>
        </footer>
      </main>
    </div>
  );
}
