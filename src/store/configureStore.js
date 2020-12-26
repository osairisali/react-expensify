import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// add support untuk dispatching function in async actions (thunk bertindak sbg middleware)
import thunk from "redux-thunk";
import expensesReducer from "../reducers/expenses";
import filterReducer from "../reducers/filters";
import authReducer from "../reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  // STORE creation dengan function reducer yg sdh mencakup action
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filterReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
