import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";

import rootReducer from "./reducers/rootReducer";

const configureStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  createLogger({ collapsed: true })
);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(configureStoreWithMiddleware)
);

export default store;
