import styles from "./Box.module.css";

function Box({ children }) {
  return <div className={styles.box}>{children}</div>;
}

export default Box;
