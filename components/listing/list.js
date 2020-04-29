import React from "react";
import PropTypes from "prop-types";
import styles from "./list.module.css";
import Card from "./card";

const List = (props) => {
  return (
    <div className={styles.list}>
      {props.data.map((citizen) => (
        <Card key={citizen.id} citizen={citizen} />
      ))}
    </div>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
};

export default List;
