import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
// createBrowserHistory digunakan untuk modifikasi Router agar bs digunakan diluar context componentnya
// ini untuk redirect setelah login dan logout
import createHistory from "history/createBrowserHistory";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";

// export agar bisa diakses diluar context
export const history = createHistory();

// The first one, <BrowserRouter>, is usually given an alias of 'Router' and this is the parent component
// that is used to store all of your <Route> components. The <Route> components are what tell your app which other
// components to display based on the route.
// const AppRouter = () => (
//   // BrowserRouter hanya mengekspektasi satu child, jadi untuk lebih dari satu child, gunakan div tag
//   // route ini cara kerjanya mirip route pada express
//   // pada path="/", atribut exact:{true} ditambahkan agar hanya render untuk exact request ke '/'
//   <BrowserRouter>
//     <div>
//       <Header />
//       <Switch>
//         <Route path="/" component={LoginPage} exact={true} />
//         <Route path="/dashboard" component={ExpenseDashboardPage} />
//         <Route path="/create" component={AddExpensePage} />
//         <Route path="/edit/:id" component={EditExpensePage} />
//         <Route path="/help" component={HelpPage} />
//         <Route component={NotFoundPage} />
//       </Switch>
//     </div>
//   </BrowserRouter>
// );

const AppRouter = () => (
  // klo pake history, maka modifikasi router code jadi gini
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
