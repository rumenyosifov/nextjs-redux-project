import React from "react";
import PropTypes from "prop-types";
import Checkbox from "./checkbox";
import styles from "./filters.module.css";
import FilterBox from "./filterBox";
import SliderFilter from "./sliderFilter";

const Filters = (props) => {
  return (
    <>
      <div className={styles.divCloseButton}>
        <span className={styles.closeButton} onClick={() => props.setShowFilter(!props.showFilter)}>
          &times;
        </span>
      </div>
      <FilterBox title="City">
        <select
          className={styles.dropdown}
          onChange={(e) => props.onSelectOption(e.target.value, "city")}
          value={props.city}
        >
          {props.citiesArr.map((elem) => (
            <option className={styles.dropdownOption} key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </select>
      </FilterBox>
      <FilterBox title="Name" onClearFilter={() => props.onClearFilter("name")} showClearFilter={!!props.filter}>
        <input
          className={styles.form}
          placeholder="Search"
          name="fileter"
          type="text"
          onKeyPress={(e) => props.onSelectFilter(e, "name")}
          onChange={(e) => props.setFilter(e.target.value)}
          value={props.filter}
        />
      </FilterBox>
      <FilterBox
        title="Profession"
        onClearFilter={() => props.onClearFilter("professions")}
        showClearFilter={props.professions.length !== 0}
      >
        {props.allProfessions.map((profession, key) => (
          <Checkbox
            key={key}
            field="professions"
            value={profession}
            checked={props.professions.indexOf(profession) !== -1}
            onSelectCheckbox={props.onSelectCheckbox}
          />
        ))}
      </FilterBox>
      <FilterBox
        title="Hair Color"
        onClearFilter={() => props.onClearFilter("hair_color")}
        showClearFilter={props.hair_color.length !== 0}
      >
        {props.allHairColors.map((hairColor, key) => (
          <Checkbox
            key={key}
            field="hair_color"
            value={hairColor}
            checked={props.hair_color.indexOf(hairColor) !== -1}
            onSelectCheckbox={props.onSelectCheckbox}
          />
        ))}
      </FilterBox>
      <FilterBox
        title="Age"
        onClearFilter={() => props.onClearFilter("age")}
        showClearFilter={props.age.min !== props.minMaxAges.min || props.age.max !== props.minMaxAges.max}
      >
        <SliderFilter
          minMaxValues={props.minMaxAges}
          values={props.age}
          fieldName="age"
          units="years"
          onMoveSlider={props.onMoveSlider}
        />
      </FilterBox>
      <FilterBox
        title="Height"
        onClearFilter={() => props.onClearFilter("height")}
        showClearFilter={props.height.min !== props.minMaxHeights.min || props.height.max !== props.minMaxHeights.max}
      >
        <SliderFilter
          minMaxValues={props.minMaxHeights}
          values={props.height}
          fieldName="height"
          units="cm"
          onMoveSlider={props.onMoveSlider}
        />
      </FilterBox>
      <FilterBox
        title="Weight"
        onClearFilter={() => props.onClearFilter("weight")}
        showClearFilter={props.weight.min !== props.minMaxWeights.min || props.weight.max !== props.minMaxWeights.max}
      >
        <SliderFilter
          minMaxValues={props.minMaxWeights}
          values={props.weight}
          fieldName="weight"
          units="kg"
          onMoveSlider={props.onMoveSlider}
        />
      </FilterBox>
      <FilterBox
        title="Gender"
        onClearFilter={() => props.onClearFilter("gender")}
        showClearFilter={!!props.gender.length}
      >
        <Checkbox
          field="gender"
          value="Male"
          checked={props.gender.indexOf("Male") !== -1}
          onSelectCheckbox={props.onSelectCheckbox}
        />
        <Checkbox
          field="gender"
          value="Female"
          checked={props.gender.indexOf("Female") !== -1}
          onSelectCheckbox={props.onSelectCheckbox}
        />
      </FilterBox>
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
  age: PropTypes.object.isRequired,
  minMaxAges: PropTypes.object.isRequired,
  height: PropTypes.object.isRequired,
  minMaxHeights: PropTypes.object.isRequired,
  weight: PropTypes.object.isRequired,
  minMaxWeights: PropTypes.object.isRequired,
  onSelectCheckbox: PropTypes.func.isRequired,
  onMoveSlider: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
  setShowFilter: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
};
export default Filters;
