import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Checkbox from "./checkbox";
import styles from "./filters.module.css";
import FilterBox from "./filterBox";
import SliderFilter from "./sliderFilter";

const Filters = (props) => {
  const [nameFilter, setNameFilter] = useState(props.filtersSelected.name);
  const handleOnSelectNameFilter = (e) => {
    if (e.key === "Enter") {
      props.onFilter("name", e.target.value);
    }
  };
  useEffect(() => {
    if (nameFilter !== props.filtersSelected.name) setNameFilter(props.filtersSelected.name);
  }, [props.filtersSelected.name]);

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
          onChange={(e) => props.onFilter("city", e.target.value)}
          value={props.filtersSelected.city}
        >
          {props.citiesOptions.map((elem) => (
            <option className={styles.dropdownOption} key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </select>
      </FilterBox>
      <FilterBox
        title="Name"
        onClearFilter={() => props.onFilter("name", "")}
        showClearFilter={!!props.filtersSelected.name}
      >
        <input
          className={styles.form}
          placeholder="Search"
          name="fileter"
          type="text"
          onKeyPress={(e) => handleOnSelectNameFilter(e)}
          onChange={(e) => setNameFilter(e.target.value)}
          value={nameFilter}
        />
      </FilterBox>
      <FilterBox
        title="Profession"
        onClearFilter={() => props.onFilter("professions", [])}
        showClearFilter={props.filtersSelected.professions.length !== 0}
      >
        {props.professionsOptions.map((profession, key) => (
          <Checkbox
            key={key}
            field="professions"
            value={profession}
            checked={props.filtersSelected.professions.indexOf(profession) !== -1}
            onFilter={props.onFilter}
          />
        ))}
      </FilterBox>
      <FilterBox
        title="Hair Color"
        onClearFilter={() => props.onFilter("hair_color", [])}
        showClearFilter={props.filtersSelected.hair_color.length !== 0}
      >
        {props.hairColorsOptions.map((hairColor, key) => (
          <Checkbox
            key={key}
            field="hair_color"
            value={hairColor}
            checked={props.filtersSelected.hair_color.indexOf(hairColor) !== -1}
            onFilter={props.onFilter}
          />
        ))}
      </FilterBox>
      <FilterBox
        title="Age"
        onClearFilter={() => props.onFilter("age", [])}
        showClearFilter={
          !!props.filtersSelected.age.length &&
          (props.filtersSelected.age[0] !== props.minMaxSliders.age.min ||
            props.filtersSelected.age[1] !== props.minMaxSliders.age.max)
        }
      >
        <SliderFilter
          minValue={props.minMaxSliders.age.min}
          maxValue={props.minMaxSliders.age.max}
          minSelected={props.filtersSelected.age[0] || props.minMaxSliders.age.min}
          maxSelected={props.filtersSelected.age[1] || props.minMaxSliders.age.max}
          fieldName="age"
          units="years"
          onFilter={props.onFilter}
        />
      </FilterBox>
      <FilterBox
        title="Height"
        onClearFilter={() => props.onFilter("height", [])}
        showClearFilter={
          !!props.filtersSelected.height.length &&
          (props.filtersSelected.height[0] !== props.minMaxSliders.height.min ||
            props.filtersSelected.height[1] !== props.minMaxSliders.height.max)
        }
      >
        <SliderFilter
          minValue={props.minMaxSliders.height.min}
          maxValue={props.minMaxSliders.height.max}
          minSelected={props.filtersSelected.height[0] || props.minMaxSliders.height.min}
          maxSelected={props.filtersSelected.height[1] || props.minMaxSliders.height.max}
          fieldName="height"
          units="cm"
          onFilter={props.onFilter}
        />
      </FilterBox>
      <FilterBox
        title="Weight"
        onClearFilter={() => props.onFilter("weight", [])}
        showClearFilter={
          !!props.filtersSelected.weight.length &&
          (props.filtersSelected.weight[0] !== props.minMaxSliders.weight.min ||
            props.filtersSelected.weight[1] !== props.minMaxSliders.weight.max)
        }
      >
        <SliderFilter
          minValue={props.minMaxSliders.weight.min}
          maxValue={props.minMaxSliders.weight.max}
          minSelected={props.filtersSelected.weight[0] || props.minMaxSliders.weight.min}
          maxSelected={props.filtersSelected.weight[1] || props.minMaxSliders.weight.max}
          fieldName="weight"
          units="kg"
          onFilter={props.onFilter}
        />
      </FilterBox>
      <FilterBox
        title="Gender"
        onClearFilter={() => props.onFilter("gender", [])}
        showClearFilter={!!props.filtersSelected.gender.length}
      >
        <Checkbox
          field="gender"
          value="Male"
          checked={props.filtersSelected.gender.indexOf("Male") !== -1}
          onFilter={props.onFilter}
        />
        <Checkbox
          field="gender"
          value="Female"
          checked={props.filtersSelected.gender.indexOf("Female") !== -1}
          onFilter={props.onFilter}
        />
      </FilterBox>
    </>
  );
};

Filters.propTypes = {
  filtersSelected: PropTypes.object.isRequired,
  citiesOptions: PropTypes.array.isRequired,
  professionsOptions: PropTypes.array.isRequired,
  hairColorsOptions: PropTypes.array.isRequired,
  minMaxSliders: PropTypes.object.isRequired,
  showFilter: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  setShowFilter: PropTypes.func.isRequired,
};
export default Filters;
