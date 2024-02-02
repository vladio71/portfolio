import React from 'react';
import css from "@/styles/Home.module.css";

const Navigation = () => {
    return (
        <header>
            <nav className={css.flexNavigation}>
                <h1>
                    Web Portfolio
                </h1>
                <div className={css.navigation_links}>
                    <a href={"#about"}>
                                <span className={css.nav_link}>
                                    About
                                </span>
                    </a>
                    <a href={"#skills"}>
                                <span className={css.nav_link}>
                                    Skills
                                </span>
                    </a>
                    <a href={"#projects"}>
                                <span className={css.nav_link}>
                                    Projects
                                </span>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;