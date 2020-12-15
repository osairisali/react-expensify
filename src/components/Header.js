import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <h1>Expensify</h1>
    {/* perhatikan di sini juga perlu pake exact:{true} */}
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Page
    </NavLink>
    {/* <NavLink to="/help" activeClassName="is-active">
      Help Page
    </NavLink> */}
    {/* <NavLink to="/edit" activeClassName="is-active">
      Edit Page
    </NavLink> */}
  </header>
);

export default Header;
