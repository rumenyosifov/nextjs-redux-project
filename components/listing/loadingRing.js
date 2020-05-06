import React from "react";
import styles from "./loadingRing.module.css";

const LoadingRing = () => {
  return (
    <div className={styles.loaderParent}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingRing;
