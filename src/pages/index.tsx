import Head from 'next/head'
import {Inter} from 'next/font/google'
import css from '../styles/Home.module.css'
import React, {useEffect, useRef} from "react";
import {lazy, Suspense} from 'react';
import {AiOutlineMail} from 'react-icons/ai';
import AboutSection from "@/components/AboutSection/AboutSection";
import SkillsSection from "@/components/SkillsSection/SkillsSection";
// import TreeJsBackground from "@/components/TreeJsBackground";
import ProjectsSection from "@/components/ProjectSection/ProjectsSection";
import Navigation from "@/components/Navigation/Navigation";
import MainHeading from "@/components/MainHeading/MainHeading";
import {initialData} from "../../initialData";

const TreeJsBackground = lazy(() => import("@/components/TreeJsBackground"));


const inter = Inter({subsets: ['latin']})


export default function Home() {

    const animationDelay = useRef(0)


    useEffect(() => {
        const inViewport = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.getAttribute("data-inviewport") === 'fadein') {
                        entry.target.classList.add(css.inViewport, entry.isIntersecting);
                    } else {
                        // setTimeout(() => {
                        //     entry.target.classList.add(css.inViewportHeadingAnimation, entry.isIntersecting);
                        // }, 300 * animationDelay.current)
                        // animationDelay.current += 1
                        // if (animationDelay.current == 3)
                        //     animationDelay.current = 0
                    }
                }
            });
        };

        const Obs = new IntersectionObserver(inViewport);
        document.querySelectorAll('[data-inviewport]').forEach(el => {
            Obs.observe(el);
        });


    }, [])


    return (
        <div style={{
            position: "relative",
            inset: 0,
            overflow: "hidden"
        }}>
            <Head>
                <title>Web Portfolio</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/portfolio.png"/>
            </Head>

            <main className={css.background}>

                <Suspense fallback={null}>
                    <TreeJsBackground/>
                </Suspense>
                <Navigation/>
                <MainHeading/>
                <AboutSection/>
                <SkillsSection/>
                <ProjectsSection/>
                <footer className={css.footer}>
                    Copyright © Vlad Dobrinov <a href={"mailto:vlad.dobrij123@gmail.com"}>
                    <AiOutlineMail/>
                </a>

                </footer>
            </main>
        </div>

    )
}
