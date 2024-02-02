import React from 'react';
import css from "./about.module.sass";

const AboutSection = () => {
    return (
        <>
            <div>
                <div>
                    <div className={`${css.about}`} data-inviewport={'fadein'} id={"about"}>

                        <p data-inviewport={'fadein'}>
                            Frontend Developer with experience in creating SPA using React. Like to code and
                            solve
                            logic
                            problems. Have familiarity with backend development (Express,
                            Firebase, MongoDb, SQL). Constantly learning to write better code with modern
                            technologies.
                        </p>
                    </div>

                </div>

            </div>

        </>
    );
};
//
// <div>
//     HTML
//     CSS
//     REACT
//     REDUX
// </div>

export default AboutSection;