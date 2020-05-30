import React from "react";
import styles from "./options.module.css";
import PropTypes from "prop-types";
import cn from "classnames";
import DropDown from "./dropDown";
import { PER_PAGE_ARRAY, SORT_ORDER_ARRAY } from "../../lib/constants";
import { MdFormatListBulleted, MdApps } from "react-icons/md";

const Options = (props) => {
  return (
    <div className={styles.options}>
      <div className={styles.results}>
        <h3>Results: {props.dataCount}</h3>
      </div>
      <div className={styles.buttons}>
        <div className={styles.orderDropDown}>
          <DropDown
            onChangeDropDown={props.onFilter}
            value={props.order}
            field="order"
            label="sort by"
            options={SORT_ORDER_ARRAY}
          />
        </div>
        <div className={styles.perPageDropDown}>
          <DropDown
            onChangeDropDown={props.onFilter}
            value={props.perPage}
            field="perPage"
            label="per page"
            options={PER_PAGE_ARRAY}
          />
        </div>
        <button
          className={cn(styles.gridButton, { [styles.active]: props.view === "line" })}
          onClick={() => props.onFilter("view", "line")}
        >
          <MdFormatListBulleted />
        </button>
        <button
          className={cn(styles.gridButton, { [styles.active]: props.view === "grid" })}
          onClick={() => props.onFilter("view", "grid")}
        >
          <MdApps />
        </button>
        <button className={styles.showFilter} onClick={() => props.setShowFilter(!props.showFilter)}>
          Filters
        </button>
      </div>
    </div>
  );
};

Options.propTypes = {
  dataCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  showFilter: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  setShowFilter: PropTypes.func.isRequired,
};

export default Options;
