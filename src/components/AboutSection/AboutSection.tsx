import React, { useEffect, useRef } from "react";
import css from "./about.module.sass";

const AboutSection = () => {
  return (
    <>
      <section className={`${css.about} fadeIn`} id={"about"}>
        <div className={`${css.about__container}`}>
          <h3>About</h3>
          <div className={`${css.about__content}`}>
            <p>
              Fullstack Developer with 2 years of experience building fast,
              scalable, and user-friendly apps for web and mobile platforms.
            </p>
            <p>
              I work confidently with React, Next.js, React Native, NestJS,
              Express, PostgreSQL, Firebase, and MongoDB. I’ve deployed apps
              using Vercel, AWS, and custom Nginx servers.
            </p>
            <p>
              Skilled in full-cycle development—from planning and UI design to
              API architecture and deployment. I create clean, responsive UIs
              and build real-time backend features using WebSockets and scalable
              databases.
            </p>
            <p>
              I’ve also worked with Prisma and Sequelize, and contributed to
              projects both independently and in teams.
            </p>
            <p>
              Passionate about crafting modern applications that solve real
              problems and deliver meaningful impact.
            </p>
          </div>
        </div>
        <div className={`${css.image__container}`}>
          <img
            className={`${css.image}`}
            src="/white-geom.png"
            alt="About me"
            height={800}
          />
        </div>
        <div className={`${css.back__container}`}>
          <img
            className={`${css.image}`}
            src="/smoke-back.webp"
            alt="About me"
            height={800}
          />
        </div>
      </section>
    </>
  );
};

export default AboutSection;
