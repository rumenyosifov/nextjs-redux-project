import React from "react";
import Header from "./header";
import Footer from "./footer";
import PropTypes from "prop-types";
import styles from "./layout.module.css";
import Head from "next/head";

const Layout = (props) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
