import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./sliderFilter.module.css";

const SliderFilter = (props) => {
  const [slideValues, setSlideValues] = useState({
    min: props.values.min || props.minMaxValues.min,
    max: props.values.max || props.minMaxValues.max,
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
    if (props.values.min !== slideValues.min || props.values.max !== slideValues.max) {
      setSlideValues({ min: props.values.min, max: props.values.max });
    }
  }, [props.values]);

  return (
    <div className={styles.sliderDiv}>
      <span className={styles.multiRange}>
        <input
          type="range"
          min={props.minMaxValues.min}
          max={props.minMaxValues.max}
          value={slideValues.min}
          onChange={(e) => handleChangeLowerValue(+e.target.value)}
          onMouseUp={() => {
            props.onMoveSlider(slideValues, props.fieldName);
          }}
          onTouchEnd={() => {
            props.onMoveSlider(slideValues, props.fieldName);
          }}
        />
        <input
          type="range"
          min={props.minMaxValues.min}
          max={props.minMaxValues.max}
          value={slideValues.max}
          onChange={(e) => handleChangeUpperValue(+e.target.value)}
          onMouseUp={() => {
            props.onMoveSlider(slideValues, props.fieldName);
          }}
          onTouchEnd={() => {
            props.onMoveSlider(slideValues, props.fieldName);
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
  minMaxValues: PropTypes.object.isRequired,
  onMoveSlider: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
};

export default SliderFilter;
