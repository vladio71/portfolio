import React from 'react';
import css from "./ProjectsSection.module.sass";
import {initialData} from "../../../initialData";
import Article, {ArticleObject} from "@/components/ProjectSection/Article/Article";

const ProjectSection = () => {
    return (
        <>
            <div id={"projects"} className={`meSection`} style={{
                margin: "10rem auto",
                opacity: 1,
                visibility: "visible"
            }}>
                Awesome Projects
            </div>
            <section className={css.project_section}>

                {initialData.map((article: ArticleObject) =>
                    <Article
                        key={article.heading}
                        article={article}
                    />)}


            </section>
        </>
    );
};

export default ProjectSection;