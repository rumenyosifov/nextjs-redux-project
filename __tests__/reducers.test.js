import { townDataReducer } from "../redux/reducers";
import * as types from "../redux/types";
const initialState = {
  data: {},
  loading: false,
  errorMessage: "",
};
describe("todos reducer", () => {
  it("should return the initial state", () => {
    expect(townDataReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle REQUEST_DATA_START", () => {
    expect(
      townDataReducer(initialState, {
        type: types.REQUEST_DATA_START,
      })
    ).toEqual({
      data: {},
      loading: true,
      errorMessage: "",
    });
  });

  it("should handle REQUEST_DATA_SUCCESS", () => {
    expect(
      townDataReducer(
        {
          data: {},
          loading: true,
          errorMessage: "",
        },
        {
          type: types.REQUEST_DATA_SUCCESS,
          data: { test: 1 },
        }
      )
    ).toEqual({
      data: { test: 1 },
      loading: false,
      errorMessage: "",
    });
  });

  it("should handle REQUEST_DATA_ERROR", () => {
    expect(
      townDataReducer(
        {
          data: {},
          loading: true,
          errorMessage: "",
        },
        {
          type: types.REQUEST_DATA_ERROR,
          data: { message: "invalid json response body at..." },
        }
      )
    ).toEqual({
      data: {},
      loading: false,
      errorMessage: "invalid json response body at...",
    });
  });
});
