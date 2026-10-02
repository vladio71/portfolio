import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Heading from "../common/Heading";
import css from "./getInTouch.module.css";

const links = [
  {
    label: "Email",
    href: "mailto:vlad.dobrij123@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vlad-dobrinov-a1a643234/",
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    href: "https://github.com/vladio71",
    icon: <FaGithub />,
  },
];

const GetInTouchSection = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.flexGetInTouch}>
        <Heading
          style={{
            marginBottom: 0,
            marginTop: 0,
          }}
          id="contact"
        >
          Get In Touch
        </Heading>
        <p>
          I’m currently looking for new opportunities, whether you have a
          question or just want to say hi, I’ll try my best to get back to you!
        </p>
        <a href="https://t.me/Vladichka7" target="_blank" rel="noreferrer">
          <div className={css.btn}>
            <div className={css.buttonText}>TEXT ME</div>
          </div>
        </a>
        <div className={css.links}>
          {links.map((link) => (
            <a
              key={link.label}
              className={css.link}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetInTouchSection;
