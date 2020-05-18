import React from "react";
import Head from "next/head";
import { fetchTownData } from "../../redux/actions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "./[id].module.css";
import Link from "next/link";
import LoadingRing from "../../components/listing/loadingRing";

const Details = () => {
  const storeData = useSelector((state) => state.townData.data);
  const loading = useSelector((state) => state.townData.loading);
  const filtersSelected = useSelector((state) => state.townData.filtersSelected);
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
      <div className="container">
        {loading ? (
          <LoadingRing />
        ) : (
          <div className={styles.box}>
            <div className={styles.deteils}>
              <div className={styles.imgDiv}>
                <img className={styles.imageClass} src={citizen.thumbnail} alt={citizen.name} />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>
                  <h2 className={styles.name}>{citizen.name}</h2>
                </div>
                <div className={styles.mainInfo}>
                  <div>
                    <span className={styles.bold}>Age: </span>
                    <span>{citizen.age} years</span>
                  </div>
                  <div>
                    <span className={styles.bold}>Height: </span>
                    <span>{Math.round(citizen.height)} cm</span>
                  </div>
                  <div>
                    <span className={styles.bold}>Weight: </span>
                    <span>{Math.round(citizen.weight)} cm</span>
                  </div>
                  <div>
                    <span className={styles.bold}>Hair color: </span>
                    <span>{citizen.hair_color}</span>
                  </div>
                  <div>
                    <span className={styles.bold}>Gender: </span>
                    <span>{/^\S+(te|ia|li)\s/i.test(citizen.name) ? "Female" : "Male"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.additionalInfo}>
              {citizen.friends.length !== 0 && (
                <div>
                  <span className={styles.bold}>Friends: </span>
                  <span className={styles.parentSpan}>
                    {citizen.friends.map((friend, index) => (
                      <span key={index}>
                        <Link href={`/listing?name=${friend}${filtersSelected.view === "line" ? "&view=line" : ""}`}>
                          <a>{friend}</a>
                        </Link>
                        {citizen.friends.length - 1 > index && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
              {citizen.professions.length !== 0 && (
                <div>
                  <span className={styles.bold}>Professions: </span>
                  <span className={styles.parentSpan}>
                    {citizen.professions.map((profession, index) => (
                      <span key={index}>
                        <Link
                          href={`/listing?professions=${profession}${
                            filtersSelected.view === "line" ? "&view=line" : ""
                          }`}
                        >
                          <a>{profession}</a>
                        </Link>
                        {citizen.professions.length - 1 > index && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

Details.getInitialProps = async ({ store, req }) => {
  if (Object.keys(store.getState().townData.data).length === 0) {
    if (req) {
      await store.dispatch(fetchTownData());
    } else {
      store.dispatch(fetchTownData());
    }
  }
  return {};
};

export default Details;
