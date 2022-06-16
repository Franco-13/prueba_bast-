import styles from "./loading.module.css";

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
}

export default Loading;
