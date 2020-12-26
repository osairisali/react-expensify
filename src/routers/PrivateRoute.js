import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/Header";

// perhatikan logic untuk render page ketika data login tersedia berikut
export const PrivateRoute = ({
  isAuthenticated,
  // component direname jd Component
  component: Component,
  // spread semua sisa elemen props, seperti path dll ke Router Component
  ...rest
}) => (
  <Route
    {...rest}
    // component yg dirender adalah stateless component yg anonymous
    // isAuthenticated dan Component diteruskan dari PrivateRoute params
    component={(props) =>
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
