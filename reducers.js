import { combineReducers } from "redux";
import * as types from "./types";

const initialDataState = {
  data: {},
  loading: false,
};
const townDataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case types.REQUEST_DATA_START:
      return Object.assign({}, state, { loading: true });
    case types.REQUEST_DATA_SUCCESS:
      return Object.assign({}, state, { data: action.data, loading: false });
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  townData: townDataReducer,
};

export default combineReducers(reducers);
