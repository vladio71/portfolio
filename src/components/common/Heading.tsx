import cn from "@/utils/classNames";
import classNames from "classnames";
import { ReactNode } from "react";

const Heading = ({
  id,
  children,
  style,
  className,
}: {
  children: ReactNode;
  id: string;
  style?: object;
  className?: string;
}) => {
  const newStyle = !!style ? style : {};
  return (
    <div
      id={id}
      className={cn(`meSection`, className)}
      style={{
        margin: "10rem auto",
        opacity: 1,
        visibility: "visible",
        ...newStyle,
      }}
    >
      {children}
    </div>
  );
};

export default Heading;
