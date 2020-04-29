import React from "react";
import styles from "./card.module.css";
import PropTypes from "prop-types";
import Link from "next/link";

const Card = (props) => {
  return (
    <div className={styles.column}>
      <Link href="/details/[id]" as={`/details/${props.citizen.id}`} shallow={true}>
        <div className={styles.card}>
          <div className={styles.image_div}>
            <img className={styles.imageClass} src={props.citizen.thumbnail} alt={props.citizen.name} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              <a>{props.citizen.name}</a>
            </div>
            <div>
              <span className={styles.bold}>Age: </span> {props.citizen.age}
            </div>
            <div>
              <span className={styles.bold}>Height: </span> {props.citizen.height}
            </div>
            <div>
              <span className={styles.bold}>Weight: </span> {props.citizen.weight}
            </div>
            <div>
              <span className={styles.bold}>Hair color: </span> {props.citizen.hair_color}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

Card.propTypes = {
  citizen: PropTypes.object.isRequired,
};

export default Card;
