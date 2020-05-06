import React from "react";
import styles from "./cardGrid.module.css";
import PropTypes from "prop-types";
import Link from "next/link";
import { MdSearch } from "react-icons/md";

const CardGrid = (props) => {
  return (
    <div className={styles.column}>
      <Link href="/details/[id]" as={`/details/${props.citizen.id}`} shallow={true}>
        <div className={styles.card}>
          <div className={styles.imageDiv}>
            <img className={styles.imageClass} src={props.citizen.thumbnail} alt={props.citizen.name} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              <a>{props.citizen.name}</a>
            </div>
          </div>
          <div className={styles.viewButton}>
            <span>
              <MdSearch /> View
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

CardGrid.propTypes = {
  citizen: PropTypes.object.isRequired,
};

export default CardGrid;
