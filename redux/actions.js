import * as types from "./types";
import fetch from "isomorphic-unfetch";
import { API_URL } from "../lib/constants";

export const fetchTownData = (query) => (dispatch, getState) => {
  dispatch({ type: types.REQUEST_DATA_START });
  if (Object.keys(getState().townData.data).length === 0) {
    return fetch(API_URL)
      .then((response) => response.json())
      .then((data) => dispatch({ type: types.REQUEST_DATA_SUCCESS, data, query }))
      .catch((data) => dispatch({ type: types.REQUEST_DATA_ERROR, data }));
  } else {
    return setTimeout(() => {
      dispatch({ type: types.REQUEST_DATA_SUCCESS, query });
    }, 0);
  }
};
