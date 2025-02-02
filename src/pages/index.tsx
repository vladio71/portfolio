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
import { AnimationsStages } from "@/components/ProjectSection/useAnimationProjectSection";
import cn from "@/utils/classNames";
import { inter, kanit, oswald } from "@/styles/fonts";

const TreeJsBackground = lazy(() => import("@/components/TreeJsBackground"));

export default function Home() {
  useEffect(() => {
    const inViewport = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.getAttribute("data-inviewport") === "fadein") {
            entry.target.classList.add(css.inViewport, entry.isIntersecting);
          }
        }
      });
    };

    const Obs = new IntersectionObserver(inViewport);
    document.querySelectorAll("[data-inviewport]").forEach((el) => {
      Obs.observe(el);
    });
  }, []);

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
        <Suspense fallback={null}>
          <TreeJsBackground />
        </Suspense>
        <Navigation />
        <MainHeading />
        <AboutSection />
        <WorkExperience />
        <SkillsSection />
        <ProjectsSection/>
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
