import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export class LoginPage extends React.Component {
  startLogin = () => this.props.startLogin();

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Expensify</h1>
          <p>It's time to get your expenses under control</p>
          <button onClick={this.startLogin} className="button">Log in with Google</button>
        </div>
      </div>
    );
  }
}

// const LoginPage = ({ startLogin }) => (
//   <div>
//     {/* <form>
//       <h1>Login Page</h1>
//       <input type="email" />
//       <input type="password" />
//       <button onClick={startLogin}>Log in</button>
//       <a href="/SignUp">Sign Up</a>
//     </form> */}
//     <button onClick={startLogin}>Log in</button>
//   </div>
// );

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
