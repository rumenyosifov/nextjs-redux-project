import React from "react";
import styles from "./options.module.css";
import PropTypes from "prop-types";
import { PER_PAGE_ARRAY, SORT_ORDER_ARRAY } from "../../lib/constants";

const Options = (props) => {
  return (
    <div className={styles.options}>
      <div className={styles.results}>
        <h2>all: {props.dataCount}</h2>
      </div>
      <div className={styles.buttons}>
        <select onChange={(e) => props.onSelectSort(e.target.value)} value={props.order}>
          <option value="">Order By</option>
          {SORT_ORDER_ARRAY.map((elem) => (
            <option key={elem.field} value={elem.field}>
              {elem.text}
            </option>
          ))}
        </select>
        <select onChange={(e) => props.onSelectPerPage(e.target.value)} value={props.perPage}>
          {PER_PAGE_ARRAY.map((elem) => (
            <option key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </select>
        <button className={styles.showFilter} onClick={() => props.setShowFilter(!props.showFilter)}>
          Filters
        </button>
        <div className={styles.order}></div>
      </div>
    </div>
  );
};

Options.propTypes = {
  dataCount: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  showFilter: PropTypes.bool.isRequired,
  onSelectSort: PropTypes.func.isRequired,
  onSelectPerPage: PropTypes.func.isRequired,
  setShowFilter: PropTypes.func.isRequired,
};

export default Options;
