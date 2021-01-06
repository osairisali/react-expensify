import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import Loading from "./components/Loading";
// import LoginPage from "./components/LoginPage";
// import { setTextFilter } from "./actions/filters";
// import getVisibleExpenses from "./selectors/expenses";

import { firebase } from "./firebase/firebase";

import "normalize.css/normalize.css";
import "./styles/styles.scss";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();
// untuk test apakah source-map msh bisa saat production built
// console.log("test")

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

// renderApp jika login dan logout
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<Loading />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // dispatch login uid (add uid in auth state in redux store)
    store.dispatch(login(user.uid));
    console.log("log in, user.uid: ", user.uid);
    store
      .dispatch(startSetExpenses())
      .then(() => {
        renderApp();
        console.log(history.location.pathname);
        if (history.location.pathname === "/") {
          history.push("/dashboard");
        }
      })
      .catch((error) => console.log(error));
  } else {
    // dispatch logout (remove uid from auth state in redux store)
    store.dispatch(logout());
    console.log("log out");
    renderApp();
    history.push("/");
  }
});
