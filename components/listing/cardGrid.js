import React from "react";
import styles from "./cardGrid.module.css";
import PropTypes from "prop-types";
import Link from "next/link";
import { MdSearch } from "react-icons/md";

const CardGrid = (props) => {
  return (
    <div className={styles.column}>
      <div className={styles.card}>
        <div className={styles.imageDiv}>
          <Link href="/details/[id]" as={`/details/${props.citizen.id}`} shallow={true}>
            <a>
              <img className={styles.imageClass} src={props.citizen.thumbnail} alt={props.citizen.name} />
            </a>
          </Link>
        </div>
        <div className={styles.info}>
          <Link href="/details/[id]" as={`/details/${props.citizen.id}`} shallow={true}>
            <a>{props.citizen.name}</a>
          </Link>
        </div>
        <div className={styles.viewButton}>
          <Link href="/details/[id]" as={`/details/${props.citizen.id}`} shallow={true}>
            <a>
              <MdSearch /> View
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

CardGrid.propTypes = {
  citizen: PropTypes.object.isRequired,
};

export default CardGrid;
