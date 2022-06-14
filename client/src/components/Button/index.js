import styles from "./button.module.css";

function Button({ children, onClick, title, circle, right, secondary }) {
  const result = circle
    ? styles.circle
    : right
    ? styles.btn_right
    : secondary
    ? styles.btn_secondary
    : styles.btn;

  return (
    <button
      onClick={onClick}
      className={result}
      /* className={circle ? styles.circle : right ? styles.btn_right : styles.btn} */
      title={title}
    >
      {children}
    </button>
  );
}

export default Button;
