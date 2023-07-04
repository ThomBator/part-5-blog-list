import React from "react";
import PropTypes from "prop-types";

const LoginForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <label htmlFor="Username">username</label>
      <input
        type="text"
        value={props.username}
        name="Username"
        id="username"
        onChange={props.handleUsernameChange}
      />
    </div>
    <div>
      <label htmlFor="Password">password</label>
      <input
        type="password"
        value={props.password}
        name="Password"
        id="password"
        onChange={props.handlePasswordChange}
      />
    </div>
    <div>
      <button id="login-button" type="submit">
        login
      </button>
    </div>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;
