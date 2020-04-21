import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchTownData } from "../actions";

class Index extends PureComponent {
  static getInitialProps({ store, req }) {
    if (Object.keys(store.getState().townData.data).length === 0) {
      store.dispatch(fetchTownData());
    }
    return {};
  }

  render() {
    return <>Initial Page</>;
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Index);
