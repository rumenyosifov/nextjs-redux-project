import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./dropDown.module.css";
import cn from "classnames";

const DropDown = (props) => {
  const [selected, setSelected] = useState(props.value);
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  const escapeListener = useCallback((e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);
  const clickListener = useCallback(
    (e) => {
      if (!ref.current.contains(e.target)) {
        setOpen(false);
      }
    },
    [ref.current]
  );
  useEffect(() => {
    document.addEventListener("click", clickListener);
    document.addEventListener("keyup", escapeListener);
    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keyup", escapeListener);
    };
  }, []);

  const handleOnSelect = (val) => {
    setSelected(val);
    props.onChangeDropDown(props.field, val);
  };
  const selectedElement = props.options.find((opt) => selected === opt.value);
  return (
    <div className={cn(styles.dropdown, { [styles.opened]: open })}>
      {props.label && <span className={styles.label}>{props.label}</span>}
      <button ref={ref} onClick={() => setOpen(!open)}>
        {selectedElement ? selectedElement.text : "select"}
      </button>
      <ul>
        {props.options.map((option) => (
          <li
            key={option.value}
            className={cn({ [styles.selected]: selected === option.value })}
            onClick={() => handleOnSelect(option.value)}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropDown.propTypes = {
  onChangeDropDown: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  field: PropTypes.string,
  options: PropTypes.array.isRequired,
};

export default DropDown;
