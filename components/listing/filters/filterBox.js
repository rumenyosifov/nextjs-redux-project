import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./filterBox.module.css";
import cn from "classnames";

const FilterBox = (props) => {
  const [hideContent, setHideContent] = useState(false);
  return (
    <div className={cn(styles.box, { [styles.contentHidden]: hideContent })}>
      <div className={styles.head} onClick={() => setHideContent(!hideContent)}>
        <span className={styles.text}>{props.title}</span>
        <span className={styles.arrow}></span>
      </div>
      <div className={styles.filterContent}>{props.children}</div>
      {typeof props.onClearFilter == "function" && (
        <div
          className={cn(styles.clearFilter, { [styles.active]: props.showClearFilter })}
          onClick={props.onClearFilter}
        >
          <div>
            <span className={styles.closeButton}>&times;</span>Clear Filter
          </div>
        </div>
      )}
    </div>
  );
};

FilterBox.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  showClearFilter: PropTypes.bool,
  onClearFilter: PropTypes.func,
};

export default FilterBox;
