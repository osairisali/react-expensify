import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
// import { addExpense } from "./actions/expenses";
// import { setTextFilter } from "./actions/filters";
// import getVisibleExpenses from "./selectors/expenses";

import "normalize.css/normalize.css";
import "./styles/styles.scss";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();
// untuk test apakah source-map msh bisa saat production built
console.log("test")
// const unsubscribe = store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//   console.log("visible expenses: ", visibleExpenses);
// });

// console.log("state: ", store.getState());

// store.dispatch(addExpense({ description: "water bill", amount: 20 }));
// // filter reducer default diset menurut date (lihat ../reducers/filters)
// store.dispatch(
//   addExpense({ description: "gas bill", amount: 50, cretedAt: 1000 })
// );
// store.dispatch(addExpense({ description: "rent", amount: 29 }));

// store.dispatch(setTextFilter("bill"));

// // perubahan store ini setelah 5 detik akan render ulang ExpenseList
// setTimeout(() => {
//   store.dispatch(setTextFilter("water"));
// }, 5000);

// Component Provider akan digunakan untuk menghubungkan perubahan pada store ke props Component
// yang ada di AppRouter
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
// ReactDOM.render(<AppRouter />, document.getElementById("app"));
