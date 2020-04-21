import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

// CREATING INITIAL STORE
export default (initialState) => {
  const middleware = [thunkMiddleware];
  if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
  }
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  // IF REDUCERS WERE CHANGED, RELOAD WITH INITIAL STATE
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const createNextReducer = require("./reducers").default;

      store.replaceReducer(createNextReducer(initialState));
    });
  }

  return store;
};
