import React from "react";
import PropTypes from "prop-types";
import styles from "./checkbox.module.css";

const Checkbox = (props) => {
  return (
    <label className={styles.container}>
      {props.value}
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onFilter(props.field, props.value, e.target.checked)}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

Checkbox.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Checkbox;
