import Heading from "../common/Heading";
import css from "./getInTouch.module.css";

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
        <a href="https://t.me/Vladichka7" target="_blank">
          <div className={css.btn}>
            <div className={css.buttonText}>TEXT ME</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default GetInTouchSection;
