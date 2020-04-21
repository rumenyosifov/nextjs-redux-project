import * as types from "./types";
import fetch from "isomorphic-unfetch";
import API_URL from "./lib/constants";

export const fetchTownData = () => (dispatch) => {
  dispatch({ type: types.REQUEST_DATA_START });
  return fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: types.REQUEST_DATA_SUCCESS, data });
    });
};
