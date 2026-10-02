import React from "react";
import css from "./about.module.sass";

const AboutSection = () => {
  return (
    <section className={`${css.about} fadeIn`} id={"about"}>
      <div className={`${css.about__container}`}>
        <h3>About</h3>
        <div className={`${css.about__content}`}>
          <p>
            Full-stack engineer with 5+ years in TypeScript: Node.js and its
            ecosystem on the back end, React and Next.js on the front end, AWS
            and CI/CD around them.
          </p>
          <p>
            I have worked in very different setups: from all-in-one apps for
            mobile and web at once to high-traffic pipelines on microservices
            and queues. I have run production on a single EC2 instance, on a
            NestJS and Lambda hybrid and fully serverless.
          </p>
          <p>
            3D is familiar ground: I worked as a 3D visualizer in 3ds Max,
            built a client project on the Autodesk API, and the 3D scenes on
            this page are Three.js.
          </p>
          <p>I also work in Python: automation scripts and FastAPI services.</p>
        </div>
      </div>
      <div className={`${css.back__container}`}>
        <img
          className={`${css.image}`}
          src="/smoke-back.webp"
          alt=""
          height={800}
        />
      </div>
    </section>
  );
};

export default AboutSection;
