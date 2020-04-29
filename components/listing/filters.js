import React from "react";
import PropTypes from "prop-types";
import styles from "./filters.module.css";
import cn from "classnames";

const Filters = (props) => {
  return (
    <>
      <div className={styles.divCloseButton}>
        <span className={styles.closeButton} onClick={() => props.setShowFilter(!props.showFilter)}>
          &times;
        </span>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>City</div>
        <select onChange={(e) => props.onSelectOption(e.target.value, "city")} value={props.city}>
          {props.citiesArr.map((elem) => (
            <option className={styles.dropdown} key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>Name</div>
        <input
          className={styles.form}
          placeholder="Search"
          name="fileter"
          type="text"
          onKeyPress={(e) => props.onSelectFilter(e, "name")}
          onChange={(e) => props.setFilter(e.target.value)}
          value={props.filter}
        />
      </div>
      <div className={cn(styles.box, styles.checkbox_div)}>
        <div className={styles.title}>Profession</div>
        {props.allProfessions.map((profession, key) => (
          <label key={key}>
            <input
              key={key}
              className={styles.checkbox}
              type="checkbox"
              checked={props.professions.indexOf(profession) !== -1}
              onChange={(e) => props.onSelectCheckbox(profession, "professions", e.target.checked)}
            />{" "}
            {profession}
          </label>
        ))}
      </div>
      <div className={cn(styles.box, styles.checkbox_div)}>
        <div className={styles.title}>Hair Color</div>
        {props.allHairColors.map((hairColor, key) => (
          <label key={key}>
            <input
              key={key}
              className={styles.checkbox}
              type="checkbox"
              checked={props.hair_color.indexOf(hairColor) !== -1}
              onChange={(e) => props.onSelectCheckbox(hairColor, "hair_color", e.target.checked)}
            />{" "}
            {hairColor}
          </label>
        ))}
      </div>
    </>
  );
};

Filters.propTypes = {
  onSelectFilter: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  professions: PropTypes.array.isRequired,
  hair_color: PropTypes.array.isRequired,
  allProfessions: PropTypes.array.isRequired,
  allHairColors: PropTypes.array.isRequired,
  allHairColors: PropTypes.array.isRequired,
  onSelectCheckbox: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
  setShowFilter: PropTypes.func.isRequired,
};
export default Filters;
