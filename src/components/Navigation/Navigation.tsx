import React from "react";
import css from "@/styles/Home.module.css";

const Navigation = () => {
  return (
    <header>
      <nav className={css.flexNavigation}>
        <h1>Web Portfolio</h1>
        <div className={css.navigation_links}>
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
    <a href={linkToSection}>
      <span className={css.nav_link}>{name}</span>
    </a>
  );
};

export default Navigation;
