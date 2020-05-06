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
        onChange={(e) => props.onSelectCheckbox(props.value, props.field, e.target.checked)}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

Checkbox.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onSelectCheckbox: PropTypes.func.isRequired,
};

export default Checkbox;
