import styles from "../components/Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo}>
      <span className={styles.wave}>🌊</span>
      <h1>Sound Wave</h1>
    </div>
  );
}

export default Logo;
