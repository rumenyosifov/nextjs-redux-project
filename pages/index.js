import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "./index.module.css";

const Index = () => {
  return (
    <>
      <Head>
        <title>Gnome Towns</title>
      </Head>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.title}>Welcome to Gnome Towns!</h1>
        <p className={styles.description}>Here you can find what you are searching for!</p>
      </div>
    </>
  );
};

export default Index;
