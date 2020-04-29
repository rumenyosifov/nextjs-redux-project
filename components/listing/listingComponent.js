import React, { useState, useEffect } from "react";
import Router from "next/router";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import styles from "./listingComponent.module.css";
import Options from "./options";
import Filters from "./filters";
import { PER_PAGE_ARRAY } from "../../lib/constants";
import List from "./list";
import cn from "classnames";

const ListingComponent = (props) => {
  const { page } = props.routerQuery;
  const multipleChoiceFilters = {
    professions: props.routerQuery.professions ? props.routerQuery.professions.split("-") : [],
    hair_color: props.routerQuery.hair_color ? props.routerQuery.hair_color.split("-") : [],
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

  useEffect(() => {
    let cityData = props.storeData[citySelected];
    if (filter !== name) setFilter(name);

    if (name || multipleChoiceFilters.hair_color.length || !!multipleChoiceFilters.professions.length) {
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
            }, false))
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
            setFilter={setFilter}
            allProfessions={allProfessions}
            allHairColors={allHairColors}
            professions={multipleChoiceFilters.professions}
            hair_color={multipleChoiceFilters.hair_color}
            allHairColors={allHairColors}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
        </div>
        <div className={styles.right}>
          <Options
            dataCount={filteredData.data.length}
            order={order}
            perPage={perPage}
            onSelectSort={handleOnSelectSort}
            onSelectPerPage={handleOnSelectPerPage}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
          <List data={filteredData.pageData} />
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
