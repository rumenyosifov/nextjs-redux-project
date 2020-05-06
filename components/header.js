import React from "react";
import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/">
          <a className={styles.logo}>GNOME TOWNS</a>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navUl}>
            <li>
              <Link href="/listing">
                <a>Listing</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>About As</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
