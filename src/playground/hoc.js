// Higher Order Component

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

// regular function yg return component
const withAdminWarning = (WrappedComponent) => {
  // return stateless component
  // props dari <AdminInfo info=.../> pada ReactDOM.render() diteruskan ke props pada stateless component ini
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share!</p>}
      {/* props dr stateless component ini kemudian dispread sbg props pada Info */}
      <WrappedComponent {...props} />
    </div>
  );
};

// requireAuthentication component fun
const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>This user is not authenticated </p>
      )}
    </div>
  );
};

// buat Component hasil dari withAdminWarning
// ini bertindak sebagai regular fun yg return Component
// ini yg disebut HOC krn berupa component yang menghasilkan component
const AdminInfo = withAdminWarning(Info);

const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(
//   <AdminInfo isAdmin={true} info="there are the details" />,
//   document.getElementById("app")
// );

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="there are the details" />,
  document.getElementById("app")
);
