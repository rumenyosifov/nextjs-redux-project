import React from "react";
import { fetchTownData } from "../redux/actions";
import { useRouter } from "next/router";
import ListingComponent from "../components/listing/listingComponent";
import Head from "next/head";
import { useSelector } from "react-redux";
import LoadingRing from "../components/listing/loadingRing";

export const Listing = () => {
  const router = useRouter();
  const storeData = useSelector((state) => state.townData.data);
  const loading = useSelector((state) => state.townData.loading);
  const { city, name, hair_color } = router.query;
  const title =
    "Citizens listing for " +
    (city ? city : Object.keys(storeData)[0]) +
    (name ? ", with name containing " + name : "") +
    (hair_color ? ", with hair color " + hair_color : "");

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container">
        {loading ? <LoadingRing /> : <ListingComponent routerQuery={router.query} storeData={storeData} />}
      </div>
    </>
  );
};

Listing.getInitialProps = async ({ store, req }) => {
  if (Object.keys(store.getState().townData.data).length === 0) {
    if (req) {
      await store.dispatch(fetchTownData());
    } else {
      store.dispatch(fetchTownData());
    }
  }
  return {};
};

export default Listing;
