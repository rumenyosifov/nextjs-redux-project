import React from "react";
import { fetchTownData } from "../redux/actions";
import Link from "next/link";

const Index = () => <>Initial Pageee</>;

Index.getInitialProps = async ({ store }) => {
  if (Object.keys(store.getState().townData.data).length === 0) {
    await store.dispatch(fetchTownData());
  }
  return {};
};

export default Index;
