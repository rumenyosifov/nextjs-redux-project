import React from "react";
import Head from "next/head";
import styles from "./about.module.css";

const About = () => {
  return (
    <>
      <Head>
        <title>About as</title>
      </Head>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.title}>About as</h1>
        <p className={styles.description}>We are gnome towns!</p>
      </div>
    </>
  );
};

export default About;
