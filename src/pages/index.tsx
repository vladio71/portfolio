import Head from "next/head";
import { Inter } from "next/font/google";
import css from "../styles/Home.module.css";
import React, { useEffect, useRef, useState } from "react";
import { lazy, Suspense } from "react";
import { AiOutlineMail } from "react-icons/ai";
import AboutSection from "@/components/AboutSection/AboutSection";
import SkillsSection from "@/components/SkillsSection/SkillsSection";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import Navigation from "@/components/Navigation/Navigation";
import MainHeading from "@/components/MainHeading/MainHeading";
import { initialData } from "../../initialData";
import WorkExperience from "@/components/WorkExpepienceSection/WorkExperience";
import GetInTouchSection from "@/components/GetInTouch/GetInTouchSection";
import { AnimationsStages } from "@/components/ProjectSection/useAnimationProjectSection";

const TreeJsBackground = lazy(() => import("@/components/TreeJsBackground"));

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const animationDelay = useRef(0);
  const [ballGameStage, setBallGameStage] = useState<AnimationsStages>(-1);

  useEffect(() => {
    const inViewport = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.getAttribute("data-inviewport") === "fadein") {
            if (entry.target.getAttribute("data-id") === "0") {
              setTimeout(() => {
                setBallGameStage(0);
              }, 1000);
            }
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

      <main className={css.background}>
        <Suspense fallback={null}>
          <TreeJsBackground />
        </Suspense>
        <Navigation />
        <MainHeading />
        <AboutSection />
        <WorkExperience />
        <SkillsSection />
        <ProjectsSection
          ballGameStage={ballGameStage}
          setBallGameStage={setBallGameStage}
        />
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
