import React, { useEffect, useRef } from "react";
import css from "@/styles/Home.module.css";
import gsap from "gsap";

const Navigation = ({ triggerAnimation }) => {
  const firstItem = useRef<HTMLHeadingElement>();
  const navlinks = useRef<HTMLDivElement>();

  useEffect(() => {
    if (triggerAnimation == 1) {
      const timelineOptions = {
        duration: 1,
        stagger: {
          each: 0.075,
        },
      };
      const allBoxes = navlinks.current.querySelectorAll(".link");

      gsap.to(firstItem.current, {
        delay: 0.3,
        opacity: 1,
        overwrite: "auto",
        ease: "power4.out",
      });
      gsap.to(allBoxes, {
        ...timelineOptions,
        delay: 0.4,
        y: 0,
        opacity: 1,
        overwrite: "auto",
        ease: "power4.out",
      });
    }
  }, [triggerAnimation]);

  return (
    <header>
      <nav className={css.flexNavigation}>
        <h1
          ref={firstItem}
          style={{
            opacity: 0,
          }}
        >
          Web Portfolio
        </h1>
        <div ref={navlinks} className={css.navigation_links}>
          <NavigationItem name={"About"} />
          <NavigationItem name={"Experience"} />
          <NavigationItem name={"Skills"} />
          <NavigationItem name={"Projects"} />
          <NavigationItem name={"Contact"} />
        </div>
      </nav>
    </header>
  );
};

const NavigationItem = ({ name }: { name: string }) => {
  const linkToSection = "#" + name.toLowerCase();
  return (
    <a
      href={linkToSection}
      className="link"
      style={{
        opacity: 0,
        transform: "translateY(-40px)",
      }}
    >
      <span className={css.nav_link}>{name}</span>
    </a>
  );
};

export default Navigation;
