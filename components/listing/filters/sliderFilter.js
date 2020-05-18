import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./sliderFilter.module.css";

const SliderFilter = (props) => {
  const [slideValues, setSlideValues] = useState({
    min: props.minSelected,
    max: props.maxSelected,
  });

  const handleChangeLowerValue = (value) => {
    if (value < slideValues.max) {
      setSlideValues({ min: value, max: slideValues.max });
    }
  };
  const handleChangeUpperValue = (value) => {
    if (value > slideValues.min) {
      setSlideValues({ min: slideValues.min, max: value });
    }
  };

  useEffect(() => {
    if (props.minSelected !== slideValues.min || props.maxSelected !== slideValues.max) {
      setSlideValues({ min: props.minSelected, max: props.maxSelected });
    }
  }, [props.minSelected, props.maxSelected]);

  return (
    <div className={styles.sliderDiv}>
      <span className={styles.multiRange}>
        <input
          type="range"
          min={props.minValue}
          max={props.maxValue}
          value={slideValues.min}
          onChange={(e) => handleChangeLowerValue(+e.target.value)}
          onMouseUp={() => {
            props.onFilter(props.fieldName, [slideValues.min, slideValues.max]);
          }}
          onTouchEnd={() => {
            props.onFilter(props.fieldName, [slideValues.min, slideValues.max]);
          }}
        />
        <input
          type="range"
          min={props.minValue}
          max={props.maxValue}
          value={slideValues.max}
          onChange={(e) => handleChangeUpperValue(+e.target.value)}
          onMouseUp={() => {
            props.onFilter(props.fieldName, [slideValues.min, slideValues.max]);
          }}
          onTouchEnd={() => {
            props.onFilter(props.fieldName, [slideValues.min, slideValues.max]);
          }}
        />
      </span>
      <span className={styles.info}>
        {slideValues.min} - {slideValues.max} {props.units}
      </span>
    </div>
  );
};

SliderFilter.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  minSelected: PropTypes.number.isRequired,
  maxSelected: PropTypes.number.isRequired,
  fieldName: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
};

export default SliderFilter;
