import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import styles from "./listingComponent.module.css";
import Options from "./options";
import Filters from "./filters/filters";
import { PER_PAGE_ARRAY } from "../../lib/constants";
import List from "./list";
import cn from "classnames";

const ListingComponent = (props) => {
  const { page } = props.routerQuery;
  const listingEl = useRef();
  const multipleChoiceFilters = {
    professions: props.routerQuery.professions ? props.routerQuery.professions.split("-") : [],
    hair_color: props.routerQuery.hair_color ? props.routerQuery.hair_color.split("-") : [],
    gender: props.routerQuery.gender ? props.routerQuery.gender.split("-") : [],
  };

  const name = props.routerQuery.name || "";
  const perPage = +props.routerQuery.perPage || PER_PAGE_ARRAY[0];
  const citiesArr = Object.keys(props.storeData);
  const citySelected = !props.routerQuery.city ? Object.keys(props.storeData)[0] : props.routerQuery.city;

  const order = props.routerQuery.order || "";
  const orderField = order ? (order.charAt(0) === "-" ? order.substring(1) : order) : "";
  const desc = order && order.charAt(0) === "-" ? true : false;

  const [filter, setFilter] = useState(name);
  const [filteredData, setFilteredData] = useState({ data: [], pageData: [] });
  const [showFilter, setShowFilter] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  const allProfessions = filteredData.data
    .reduce((acomulator, citizen) => {
      return acomulator.concat(citizen.professions.map((profession) => profession.trim()));
    }, [])
    .filter((profession, i, self) => self.indexOf(profession) === i)
    .sort();
  const allHairColors = props.storeData[citySelected]
    .map((citizen) => citizen.hair_color)
    .filter((color, i, self) => self.indexOf(color) === i)
    .sort();
  const minMaxAges = props.storeData[citySelected].reduce((acomulator, citizen) => {
    if (!acomulator.min || acomulator.min > citizen.age) acomulator.min = citizen.age;
    if (!acomulator.max || acomulator.max < citizen.age) acomulator.max = citizen.age;
    return acomulator;
  }, {});
  let minMaxHeights = props.storeData[citySelected].reduce((acomulator, citizen) => {
    if (!acomulator.min || acomulator.min > citizen.height) acomulator.min = citizen.height;
    if (!acomulator.max || acomulator.max < citizen.height) acomulator.max = citizen.height;
    return acomulator;
  }, {});
  minMaxHeights = { min: Math.floor(minMaxHeights.min), max: Math.ceil(minMaxHeights.max) };
  let minMaxWeights = props.storeData[citySelected].reduce((acomulator, citizen) => {
    if (!acomulator.min || acomulator.min > citizen.weight) acomulator.min = citizen.weight;
    if (!acomulator.max || acomulator.max < citizen.weight) acomulator.max = citizen.weight;
    return acomulator;
  }, {});
  minMaxWeights = { min: Math.floor(minMaxWeights.min), max: Math.ceil(minMaxWeights.max) };

  const agesArr = props.routerQuery.age ? props.routerQuery.age.split("-") : [];
  const heightsArr = props.routerQuery.height ? props.routerQuery.height.split("-") : [];
  const weightsArr = props.routerQuery.weight ? props.routerQuery.weight.split("-") : [];

  const sliderFilters = {
    age: { min: +agesArr[0] || minMaxAges.min, max: +agesArr[1] || minMaxAges.max },
    height: { min: +heightsArr[0] || minMaxHeights.min, max: +heightsArr[1] || minMaxHeights.max },
    weight: { min: +weightsArr[0] || minMaxWeights.min, max: +weightsArr[1] || minMaxWeights.max },
  };

  useEffect(() => {
    if (listingEl.current) listingEl.current.scrollIntoView();
    let cityData = props.storeData[citySelected];
    if (filter !== name) setFilter(name);

    if (
      name ||
      multipleChoiceFilters.hair_color.length ||
      !!multipleChoiceFilters.professions.length ||
      sliderFilters.age.min ||
      sliderFilters.height.min ||
      sliderFilters.weight.min
    ) {
      cityData = cityData.filter((cityzen) => {
        return (
          (!name || cityzen.name.toLowerCase().includes(name.toLowerCase())) &&
          (!multipleChoiceFilters.hair_color.length ||
            multipleChoiceFilters.hair_color.indexOf(cityzen.hair_color) !== -1) &&
          (!multipleChoiceFilters.professions.length ||
            cityzen.professions.reduce((acomulator, element) => {
              if (multipleChoiceFilters.professions.indexOf(element) !== -1) {
                acomulator = true;
              }
              return acomulator;
            }, false)) &&
          (!multipleChoiceFilters.gender.length ||
            multipleChoiceFilters.gender.reduce((acomulator, element) => {
              if (element !== "Female" && /^\S+(te|ia|li)\s/i.test(cityzen.name)) {
                acomulator = true;
              } else if (element !== "Male" && !/^\S+(te|ia|li)\s/i.test(cityzen.name)) {
                acomulator = true;
              }
              return acomulator;
            }, false)) &&
          (!sliderFilters.age.min || (cityzen.age >= sliderFilters.age.min && cityzen.age <= sliderFilters.age.max)) &&
          (!sliderFilters.height.min ||
            (cityzen.height >= sliderFilters.height.min && cityzen.height <= sliderFilters.height.max)) &&
          (!sliderFilters.weight.min ||
            (cityzen.weight >= sliderFilters.weight.min && cityzen.weight <= sliderFilters.weight.max))
        );
      });
    }

    if (orderField) {
      cityData.sort((a, b) => {
        if (typeof a[orderField] === "string" && typeof b[orderField] === "string") {
          var x = a[orderField].toLowerCase();
          var y = b[orderField].toLowerCase();
          if (x < y) {
            return desc ? 1 : -1;
          }
          if (x > y) {
            return desc ? -1 : 1;
          }
          return 0;
        } else {
          return desc ? b[orderField] - a[orderField] : a[orderField] - b[orderField];
        }
      });
    }

    const startAt = ((page || 1) - 1) * perPage;
    setFilteredData({ data: cityData, pageData: cityData.slice(startAt, startAt + perPage) });
  }, [props.routerQuery]);

  const handleOnSelectSort = (sortBy) => {
    Router.push(
      {
        pathname: "/listing",
        query: { ...props.routerQuery, order: sortBy, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleOnSelectPerPage = (perPage) => {
    Router.push(
      {
        pathname: "/listing",
        query: { ...props.routerQuery, page: 1, perPage },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleOnSelectPage = (activePage) => {
    Router.push(
      {
        pathname: "/listing",
        query: { ...props.routerQuery, page: activePage },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleOnSelectFilter = (e, filterField) => {
    if (e.key === "Enter") {
      Router.push(
        {
          pathname: "/listing",
          query: { ...props.routerQuery, [filterField]: e.target.value, page: 1 },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const handleOnSelectOption = (value, filterField) => {
    Router.push(
      {
        pathname: "/listing",
        query: { ...props.routerQuery, [filterField]: value, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleOnSelectCheckbox = (value, filterField, isChecked) => {
    let arr = multipleChoiceFilters[filterField];
    if (isChecked) {
      arr.push(value);
    } else {
      arr.splice(arr.indexOf(value), 1);
    }
    Router.push(
      {
        pathname: "/listing",
        query: { ...props.routerQuery, [filterField]: arr.join("-"), page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleOnMoveSlider = (values, filterField) => {
    Router.push(
      {
        pathname: "/listing",
        query: { ...props.routerQuery, [filterField]: `${values.min}-${values.max}`, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleOnClearFilter = (field) => {
    let query;
    if (field) {
      query = { ...props.routerQuery };
      delete query[field];
    } else {
      query = {};
    }
    Router.push(
      {
        pathname: "/listing",
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <div className={styles.listing}>
        <div className={cn({ [styles.left]: true, [styles.active]: showFilter })}>
          <Filters
            filter={filter}
            citiesArr={citiesArr}
            city={citySelected}
            onSelectFilter={handleOnSelectFilter}
            onSelectOption={handleOnSelectOption}
            onSelectCheckbox={handleOnSelectCheckbox}
            onMoveSlider={handleOnMoveSlider}
            onClearFilter={handleOnClearFilter}
            setFilter={setFilter}
            allProfessions={allProfessions}
            allHairColors={allHairColors}
            professions={multipleChoiceFilters.professions}
            hair_color={multipleChoiceFilters.hair_color}
            gender={multipleChoiceFilters.gender}
            allHairColors={allHairColors}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            age={sliderFilters.age}
            minMaxAges={minMaxAges}
            height={sliderFilters.height}
            minMaxHeights={minMaxHeights}
            weight={sliderFilters.weight}
            minMaxWeights={minMaxWeights}
          />
        </div>
        <div ref={listingEl} className={styles.right}>
          <Options
            dataCount={filteredData.data.length}
            order={order}
            perPage={perPage}
            onSelectSort={handleOnSelectSort}
            onSelectPerPage={handleOnSelectPerPage}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            showGrid={showGrid}
            setShowGrid={setShowGrid}
          />
          <List data={filteredData.pageData} showGrid={showGrid} />
          <Pagination
            activePage={page ? +page : 1}
            perPage={perPage}
            count={filteredData.data.length}
            handleOnSelectPage={handleOnSelectPage}
          />
        </div>
      </div>
    </>
  );
};

ListingComponent.propTypes = {
  routerQuery: PropTypes.object.isRequired,
  storeData: PropTypes.object.isRequired,
};

export default ListingComponent;
