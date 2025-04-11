import styles from "./footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.tagline}>
        Every recipe tells a story. What's yours?
      </p>

      <div className={styles.quote}>
        <p>"Meals aren’t just made — they’re felt"</p>
        <p className={styles.author}>- WhiteShirt</p>
      </div>

      <p className={styles.copyright}>
        © 2025 Yumly · Crafted with <span className={styles.emoji}>❤️</span>
        and <span className={styles.emoji}>🍳</span> for food lovers worldwide
      </p>
    </footer>
  );
}
