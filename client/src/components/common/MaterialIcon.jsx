const MaterialIcon = ({ name, fill = false, className = "", size, ...props }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{
      fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
      fontSize: size,
      ...props.style,
    }}
    {...props}
  >
    {name}
  </span>
);

export default MaterialIcon;
