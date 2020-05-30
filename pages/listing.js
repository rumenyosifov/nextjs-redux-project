import React, { useState } from "react";
import { fetchTownData } from "../redux/actions";
import Head from "next/head";
import { useSelector } from "react-redux";
import Router from "next/router";
import Pagination from "../components/listing/pagination";
import Options from "../components/listing/options";
import Filters from "../components/listing/filters/filters";
import List from "../components/listing/list";
import LoadingRing from "../components/listing/loadingRing";
import styles from "./listing.module.css";
import cn from "classnames";
import { PER_PAGE_ARRAY, SORT_ORDER_ARRAY } from "../lib/constants";

export const Listing = () => {
  const pageData = useSelector((state) => state.townData.pageData);
  const filtersData = useSelector((state) => state.townData.filtersData);
  const filtersSelected = useSelector((state) => state.townData.filtersSelected);
  const loading = useSelector((state) => state.townData.loading);
  const [showFilter, setShowFilter] = useState(false);

  const title = `Citizens listing for "${filtersSelected.city}${
    filtersSelected.name ? ", with name containing " + filtersSelected.name : ""
  }`;

  const handleOnFilter = (field, value, toAdd) => {
    let filters = Object.assign({}, filtersSelected);
    if (field !== "page") delete filters.page;
    if (filters.perPage === PER_PAGE_ARRAY[0]) delete filters.perPage;
    if (filters.order === SORT_ORDER_ARRAY[0].value) delete filters.order;
    if (filters.view === "grid") delete filters.view;

    switch (field) {
      case "city":
      case "name":
        filters[field] = value;
        break;
      case "hair_color":
      case "professions":
      case "gender":
        if (!value.length) {
          delete filters[field];
        } else {
          if (toAdd) {
            filters[field].push(value);
          } else {
            filters[field].splice(filters[field].indexOf(value), 1);
          }
        }
        break;
      case "age":
      case "height":
      case "weight":
        if (
          value &&
          value.length &&
          (value[0] !== filtersData.minMaxSliders[field].min || value[1] !== filtersData.minMaxSliders[field].max)
        ) {
          filters[field] = value;
        } else {
          delete filters[field];
        }
        break;
      case "page":
        if (value === 1) {
          delete filters[field];
        } else {
          filters[field] = value;
        }
        break;
      case "perPage":
        if (value === PER_PAGE_ARRAY[0]) {
          delete filters[field];
        } else {
          filters[field] = value;
        }
        break;
      case "order":
        if (value === SORT_ORDER_ARRAY[0].value) {
          delete filters[field];
        } else {
          filters[field] = value;
        }
        break;
      case "view":
        if (value === "grid") {
          delete filters[field];
        } else {
          filters[field] = value;
        }
        break;
      default:
        break;
    }

    for (const filterField in filters) {
      if (!filters[filterField] || (Array.isArray(filters[filterField]) && !filters[filterField].length)) {
        delete filters[filterField];
      } else if (Array.isArray(filters[filterField])) {
        filters[filterField] = filters[filterField].join("-");
      }
    }
    Router.push({
      pathname: "/listing",
      query: filters,
    });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container">
        <div className={styles.listing}>
          <div className={cn({ [styles.left]: true, [styles.active]: showFilter })}>
            <Filters
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              onFilter={handleOnFilter}
              filtersSelected={filtersSelected}
              citiesOptions={filtersData.citiesOptions}
              professionsOptions={filtersData.professionsOptions}
              hairColorsOptions={filtersData.hairColorsOptions}
              minMaxSliders={filtersData.minMaxSliders}
            />
          </div>
          <div className={styles.right}>
            <Options
              dataCount={filtersData.filteredDataLength}
              order={filtersSelected.order}
              perPage={filtersSelected.perPage}
              view={filtersSelected.view}
              onFilter={handleOnFilter}
              showFilter={showFilter}
              setShowFilter={setShowFilter}
            />
            {loading && <LoadingRing />}
            <List view={filtersSelected.view} data={pageData} loading={loading} />
            <Pagination
              activePage={filtersSelected.page}
              perPage={filtersSelected.perPage}
              count={filtersData.filteredDataLength}
              onFilter={handleOnFilter}
            />
          </div>
        </div>
      </div>
    </>
  );
};

Listing.getInitialProps = async ({ store, query, req }) => {
  if (req) {
    await store.dispatch(fetchTownData(query));
  } else {
    store.dispatch(fetchTownData(query));
  }
  return {};
};

export default Listing;
