import React from "react";
import styles from "./cardLine.module.css";
import PropTypes from "prop-types";
import Link from "next/link";
import { MdSearch } from "react-icons/md";

const CardLine = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageDiv}>
        <Link href="/details/[id]" as={`/details/${props.citizen.id}`} shallow={true}>
          <a>
            <img className={styles.imageClass} src={props.citizen.thumbnail} alt={props.citizen.name} />
          </a>
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          <Link href="/details/[id]" as={`/details/${props.citizen.id}`} shallow={true}>
            <a>{props.citizen.name}</a>
          </Link>
        </div>
        <div className={styles.infoDiv}>
          <div className={styles.mainInfo}>
            <div>
              <span className={styles.bold}>Age: </span>
              <span>{props.citizen.age} years</span>
            </div>
            <div>
              <span className={styles.bold}>Height: </span>
              <span>{Math.round(props.citizen.height)} cm</span>
            </div>
            <div>
              <span className={styles.bold}>Weight: </span>
              <span>{Math.round(props.citizen.weight)} kg</span>
            </div>
            <div>
              <span className={styles.bold}>Hair color: </span>
              <span>{props.citizen.hair_color}</span>
            </div>
            <div>
              <span className={styles.bold}>Gender: </span>
              <span>{/^\S+(te|ia|li)\s/i.test(props.citizen.name) ? "Female" : "Male"}</span>
            </div>
          </div>
          <div className={styles.additionalInfo}>
            <div>
              {props.citizen.friends.length !== 0 && (
                <div>
                  <span className={styles.bold}>Friends: </span>
                  <span className={styles.parentSpan}>
                    {props.citizen.friends.map((friend, index) => (
                      <span key={index}>
                        <Link href={`/listing?name=${friend}&view=line`}>
                          <a>{friend}</a>
                        </Link>
                        {props.citizen.friends.length - 1 > index && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
              {props.citizen.professions.length !== 0 && (
                <div>
                  <span className={styles.bold}>Professions: </span>
                  <span className={styles.parentSpan}>
                    {props.citizen.professions.map((profession, index) => (
                      <span key={index}>
                        <Link href={`/listing?professions=${profession}&view=line`}>
                          <a>{profession}</a>
                        </Link>
                        {props.citizen.professions.length - 1 > index && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
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

CardLine.propTypes = {
  citizen: PropTypes.object.isRequired,
};

export default CardLine;
