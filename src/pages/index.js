import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import css from '../styles/Home.module.css'
import {useEffect} from "react";
import {AiOutlineMail} from 'react-icons/ai';
import {white} from "next/dist/lib/picocolors";


const inter = Inter({subsets: ['latin']})


export default function Home() {


    useEffect(() => {
        const inViewport = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    entry.target.classList.add(css.inViewport, entry.isIntersecting);
                }
            });
        };

        const Obs = new IntersectionObserver(inViewport);
        const obsOptions = {};
        document.querySelectorAll('[data-inviewport]').forEach(el => {
            Obs.observe(el, obsOptions);
        });


    }, [false])


    return (
        <>
            <Head>
                <title>Web Portfolio</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/portfolio.png"/>
            </Head>
            <div className={css.someBackCaption}>
                     <span className={css.someBack}>
                            Frontend-Developer.
                     </span>
                <span className={css.smallBackCaption}>Frontend-Developer.</span>
                <span className={css.smallBackCaption2}>Frontend-Developer.</span>
                <span className={css.smallBackCaption3}>Frontend-Developer.</span>
            </div>
            <main className={css.background}>


                <header>


                    <nav className={css.flexNavigation}>
                        <h1 className={css.h1}>
                            Web Portfolio
                        </h1>
                        <div className={css.navigation_links}>
                            <a href={"#about"}>
                                <span className={css.nav_link}>
                                    Home
                                </span>
                            </a>
                            <a href={"#about"}>
                                <span className={css.nav_link}>
                                    About
                                </span>
                            </a>
                            <a href={"#projects"}>
                                <span className={css.nav_link}>
                                    Projects
                                </span>
                            </a>
                        </div>
                    </nav>
                    <div className={css.section}>
                        <h2 className={css.sectionName}>
                            Vlad Dobrinov
                        </h2>
                        {/*<span className={css.caption}>*/}
                        <div className={css.borders}>
                             <span className={css.caption}>
                                 <span>
                                    <span className={css.back}>Frontend-Developer.</span>
                                 </span>
                                 <span>
                                    <span className={css.back}>Frontend-Developer.</span>
                                 </span>
                                 <span>
                                    <span className={css.back}>Frontend-Developer.</span>
                                 </span>

                             </span>
                        </div>

                        <div className={css.buttons}>
                            <a href={"#projects"}>
                                <span className={css.button}>Projects</span>
                            </a>
                            <a href={"mailto:vlad.dobrij123@gmail.com"}>
                            <span className={css.button}>

                                    Contact </span>
                            </a>
                        </div>
                    </div>
                    <div className={css.section} id={"about"}>
                        <h2 className={css.sectionName}>
                            About
                        </h2>
                        <p>
                            Frontend Developer with experience in creating SPA using React. Like to code and solve logic
                            problems. Have familiarity with backend development (Express,
                            Firebase, MongoDb, SQL). Constantly learning to write better code with modern technologies.
                        </p>
                        <div>
                            HTML
                            CSS
                            REACT
                            REDUX
                        </div>
                    </div>

                </header>
                <section className={css.project_section} id={"projects"}>

                    <article id={'animation'} data-inviewport="fade-in" className={css.project_section_article}>
                        <img
                            src={'static/images/demoFull3.png'}
                            width={'100%'} height={'300px'}/>


                        <div className={css.article_caption}>
                            <h3>
                                Whiteboard
                            </h3>
                            <div>


                                Whiteboard app for sketching, note taking, building mind-maps. That altogether helps
                                think visually and make creative plans and ideas. It can be buggy in some edge
                                scenarios.
                                <div>
                                    Html
                                    Css
                                    NextJS
                                    Redux
                                </div>
                            </div>


                            <div>
                                <a className={css.button} href={"https://whiteboard-ten-xi.vercel.app/"}
                                   target={"_blank"}>
                                    Live
                                </a>
                                <a className={css.button} href={"https://github.com/vladio71/whiteboard"}
                                   target={"_blank"}>
                                    Github
                                </a>
                            </div>
                        </div>
                    </article>

                    <article id={'animation'} data-inviewport="fade-in" className={css.project_section_article}>
                        <img
                            src={'static/images/demoFull4.png'}
                            width={'100%'} height={'300px'}/>
                        <div className={css.article_caption}>
                            <h3>
                                CSMarket site copy
                            </h3>
                            <div>
                                A fully responsive website with nice animations.
                                <div>
                                    Html
                                    Css
                                    NextJS
                                </div>
                            </div>


                            <div>
                                <a className={css.button} href={"https://cs-market-site-responsive-copy.vercel.app/"}
                                   target={"_blank"}>
                                    Live
                                </a>
                                <a className={css.button}
                                   href={"https://github.com/vladio71/CSMarket-site-responsive-copy"}
                                   target={"_blank"}>
                                    Github
                                </a>
                            </div>
                        </div>
                    </article>
                    <article id={'animation'} data-inviewport="fade-in" className={css.project_section_article}>
                        <img
                            src={'static/images/demoFull.png'}
                            width={'100%'} height={'300px'}/>
                        <div className={css.article_caption}>
                            <h3>
                                Ableton
                            </h3>
                            <div>
                                A fully responsive website with some animations.
                                <div>
                                    Html
                                    Css
                                    React
                                    Redux
                                </div>
                            </div>
                            <div>
                                <a className={`${css.button}`}
                                   href={"https://responsive-music-website-kmoq.vercel.app/"}
                                   target={"_blank"}>
                                    Live
                                </a>
                                <a className={css.button} href={"https://github.com/vladio71/responsive_music_website"}
                                   target={"_blank"}>
                                    Github
                                </a>
                            </div>
                        </div>
                    </article>
                    <article id={'animation'} data-inviewport="fade-in" className={css.project_section_article}>

                        {/*<Image*/}
                        {/*    src={'/static/images/demoFull2.png'}*/}
                        {/*    alt="Foo image"*/}
                        {/*    // layout={"fill"}*/}
                        {/*    width={'600'} height={'300'}*/}
                        {/*/>*/}
                        <img
                            src={'static/images/demo.png'}
                            width={'100%'} height={'300px'}/>
                        <div className={css.article_caption}>
                            <h3>
                                Todoistik
                            </h3>
                            <div>
                                A fully responsive To-do website with drag and drop functionality and CRUD operations
                                with all objects.
                                <div>
                                    Html
                                    Css
                                    React
                                    Redux
                                </div>
                            </div>
                            <div>
                                <a className={css.button} href={"https://dnd-to-do-boards.vercel.app/"}
                                   target={"_blank"}>
                                    Live
                                </a>
                                <a className={css.button} href={"https://github.com/vladio71/DndToDoBoards"}
                                   target={"_blank"}>
                                    Github
                                </a>
                            </div>
                        </div>
                    </article>


                </section>
                <footer className={css.footer}>
                    Copyright © Vlad Dobrinov <a href={"mailto:vlad.dobrij123@gmail.com"}>
                    <AiOutlineMail/>
                </a>

                </footer>
            </main>
        </>
    )
}
