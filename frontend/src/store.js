import { applyMiddleware, createStore, compose } from "redux";

import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

export function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk))
  );
}
