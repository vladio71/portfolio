const Heading = ({ id, children, style }) => {
  const newStyle = !!style ? style : {};
  return (
    <div
      id={id}
      className={`meSection`}
      style={{
        margin: "10rem auto",
        opacity: 1,
        visibility: "visible",
        ...newStyle,
      }}
    >
      {/* Awesome Projects */}
      {children}
    </div>
  );
};

export default Heading;
