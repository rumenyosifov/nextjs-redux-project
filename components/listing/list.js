import React from "react";
import PropTypes from "prop-types";
import styles from "./list.module.css";
import CardGrid from "./cardGrid";
import CardLine from "./cardLine";
import cn from "classnames";

const List = (props) => {
  return (
    <div
      className={cn(props.view === "grid" ? styles.listGrid : styles.listLine, { [styles.isLoading]: props.loading })}
    >
      {props.data.map((citizen) =>
        props.view === "grid" ? (
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
  view: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default List;
