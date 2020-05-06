import React from "react";
import PropTypes from "prop-types";
import styles from "./list.module.css";
import CardGrid from "./cardGrid";
import CardLine from "./cardLine";

const List = (props) => {
  return (
    <div className={props.showGrid ? styles.listGrid : styles.listLine}>
      {props.data.map((citizen) =>
        props.showGrid ? (
          <CardGrid key={citizen.id} citizen={citizen} />
        ) : (
          <CardLine key={citizen.id} citizen={citizen} />
        )
      )}
    </div>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
  showGrid: PropTypes.bool.isRequired,
};

export default List;
