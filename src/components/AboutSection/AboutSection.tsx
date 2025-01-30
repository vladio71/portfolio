import React from "react";
import css from "./about.module.sass";

const AboutSection = () => {
  return (
    <>
      <div>
        <div>
          <div
            className={`${css.about}`}
            data-inviewport={"fadein"}
            id={"about"}
          >
            <p data-inviewport={"fadein"}>
              Detail-oriented and Driven Frontend Developer with over 1.5 years of
              experience creating dynamic and responsive web applications. My
              expertise is centred around JavaScript and related frameworks like
              Next, React and Angular. Capable of handling multiple projects at
              once and experienced in collaborating with backend teams to
              deliver seamless end-to-end solutions. I am looking forward to
              partnering with innovative teams to bring engaging and meaningful
              projects to life.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
