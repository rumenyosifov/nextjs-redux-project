import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import withReduxStore from "../lib/with-redux-store";
import Layout from "../components/layout";
import "../styles/global.css";

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
