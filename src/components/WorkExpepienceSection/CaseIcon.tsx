import Image from "next/image";
import css from "./work.module.css";
import workcase from "public/workcase.svg";

const CaseIcon = ({ id, className, hoveredItemId }) => {
  const hovered = hoveredItemId == id ? "hovered" : "";
  return (
    <div className={` ${css.centerIcon} ${className}`}>
      <div className={`${css.circle} ${hovered}`}>
        <div className={css.image_frame}>
          <Image src={workcase} alt="workcase" fill={true} />
        </div>
      </div>
    </div>
  );
};

export default CaseIcon;
