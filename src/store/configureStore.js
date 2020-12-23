import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import expensesReducer from "../reducers/expenses";
import filterReducer from "../reducers/filters";

// add support untuk dispatching function in async actions (thunk bertindak sbg middleware)
import thunk from "redux-thunk";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  // STORE creation dengan function reducer yg sdh mencakup action
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filterReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
