import React from "react";
import Head from "next/head";
import { fetchTownData } from "../../redux/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "./[id].module.css";

const Details = () => {
  const storeData = useSelector((state) => state.townData.data);
  const router = useRouter();
  const { id } = router.query;
  let citizen;
  for (const key in storeData) {
    citizen = storeData[key].find((x) => x.id === +id);
    if (!!citizen) {
      break;
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className={`container ${styles.container}`}>
        <div className={styles.deteils}>
          <div className={styles.imgDiv}>
            <img className={styles.imageClass} src={citizen.thumbnail} alt={citizen.name} />
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{citizen.name}</h2>
            <div>
              <span className={styles.bold}>Age: </span> {citizen.age}
            </div>
            <div>
              <span className={styles.bold}>Height: </span> {citizen.height}
            </div>
            <div>
              <span className={styles.bold}>Weight: </span> {citizen.weight}
            </div>
            <div>
              <span className={styles.bold}>Hair color: </span> {citizen.hair_color}
            </div>
            <div>
              <span className={styles.bold}>Friends: </span> {citizen.friends.join(", ")}
            </div>
            <div>
              <span className={styles.bold}>Professions: </span> {citizen.professions.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Details.getInitialProps = async ({ store }) => {
  if (Object.keys(store.getState().townData.data).length === 0) {
    await store.dispatch(fetchTownData());
  }
  return {};
};

export default Details;
