import React from "react";
import PropTypes from "prop-types";
import styles from "./pagination.module.css";
import cn from "classnames";

const Pagination = (props) => {
  let items = [];
  const { count, perPage, activePage } = props;
  const pagesCount = Math.ceil(count / perPage);
  let getNumber = (number) => (
    <span
      key={number}
      className={cn({ [styles.active]: number === activePage })}
      onClick={() => props.onFilter("page", number)}
    >
      {number}
    </span>
  );

  if (activePage > 1) items.push(<span onClick={() => props.onFilter("page", activePage - 1)}>&laquo;</span>);
  if (activePage > 1 && activePage < pagesCount) {
    items.push(getNumber(activePage - 1));
    items.push(getNumber(activePage));
    items.push(getNumber(activePage + 1));
  } else if (activePage === 1) {
    items.push(getNumber(activePage));
    if (pagesCount > 1) items.push(getNumber(activePage + 1));
    if (pagesCount - 1 > 1) items.push(getNumber(activePage + 2));
  } else if (activePage === pagesCount) {
    if (pagesCount - 1 > 1) items.push(getNumber(activePage - 2));
    if (pagesCount > 1) items.push(getNumber(activePage - 1));
    items.push(getNumber(activePage));
  }
  if (activePage < pagesCount)
    items.push(
      <span key="last" onClick={() => props.onFilter("page", activePage + 1)}>
        &raquo;
      </span>
    );
  return <div className={styles.pagination}>{items}</div>;
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Pagination;
