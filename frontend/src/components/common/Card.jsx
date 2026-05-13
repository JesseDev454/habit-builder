const Card = ({ children, className = "", ...props }) => (
  <section className={`ambient-card rounded-2xl p-5 ${className}`} {...props}>{children}</section>
);

export default Card;
