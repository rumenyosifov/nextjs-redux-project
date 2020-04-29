import React from "react";
import PropTypes from "prop-types";
import styles from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href="/about">
          <a>About As</a>
        </Link>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
