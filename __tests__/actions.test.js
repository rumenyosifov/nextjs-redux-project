import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../redux/actions";
import * as types from "../redux/types";
import fetchMock from "fetch-mock";
import json from "../testJson";
// import expect from "expect";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates REQUEST_DATA_SUCCESS when fetching town information has been done", () => {
    fetchMock.getOnce("/data", {
      body: { todos: ["do something"] },
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [
      { type: "REQUEST_DATA_START" },
      { data: json, type: "REQUEST_DATA_SUCCESS" },
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(actions.fetchTownData()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
