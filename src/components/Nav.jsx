import React from "react";
import styles from "./nav.module.css";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <span className={styles.brand}>Yumly</span>
    </div>
  );
}
