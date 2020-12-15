import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";

import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";

// The first one, <BrowserRouter>, is usually given an alias of 'Router' and this is the parent component
// that is used to store all of your <Route> components. The <Route> components are what tell your app which other
// components to display based on the route.
const AppRouter = () => (
  // BrowserRouter hanya mengekspektasi satu child, jadi untuk lebih dari satu child, gunakan div tag
  // route ini cara kerjanya mirip route pada express
  // pada path="/", atribut exact:{true} ditambahkan agar hanya render untuk exact request ke '/'
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
