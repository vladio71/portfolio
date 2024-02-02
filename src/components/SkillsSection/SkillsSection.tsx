import React from 'react';
import css from './skills.module.sass'
import {FaReact, FaNode} from "react-icons/fa";
import {SiNextdotjs, SiRedux, SiFirebase, SiGit, SiJavascript, SiTypescript, SiThreedotjs, SiHtml5, SiCss3, SiSass} from "react-icons/si";


const data = [
    {
        icon: <FaReact/>,
        name: "React"
    },
    {
        icon: <SiNextdotjs/>,
        name: "Next"
    },
    {
        icon: <SiRedux/>,
        name: "Redux"
    },
    {
        icon: <SiFirebase/>,
        name: "Firebase"
    },
    {
        icon: <SiGit/>,
        name: "Git"
    },
    {
        icon: <SiJavascript/>,
        name: "Javascript"
    },
    {
        icon: <SiTypescript/>,
        name: "Typescript"
    },
    {
        icon: <SiThreedotjs/>,
        name: "ThreeJs"
    },
    {
        icon: <FaNode/>,
        name: "NodeJS"
    },
    {
        icon: <SiHtml5/>,
        name: "HTML"
    },

    {
        icon: <SiCss3/>,
        name: "CSS"
    },
    {
        icon: <SiSass/>,
        name: "SASS"
    },


]


const SkillsSection = () => {
    return (
        <div className={css.wrapper} data-inviewport={'fadein'} id={"skills"} >
            <div className={css.skills} data-inviewport={'fadein'}>
                {data.map(skill => {
                    return <div className={css.skills_item}>
                        {skill.icon}
                        {skill.name}
                    </div>
                })}
            </div>
        </div>
    );
};

export default SkillsSection;