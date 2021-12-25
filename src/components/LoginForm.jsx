import React, { Component } from "react";
import Input from "../common/Input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "password is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  //username = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    else console.log("form submited");
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validateProperty = ({ name, value }) => {
    if (name === "password") {
      if (value.length < 6) return " password is to short.";
    }
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div className="row">
        <div className="col-6">
          <h4>Login</h4>
          <form className="form" onSubmit={this.handleSubmit}>
            <Input
              name="username"
              value={account.username}
              onChange={this.handleChange}
              label="Username"
              error={errors.username}
              type="text"
            />
            <Input
              name="password"
              value={account.password}
              onChange={this.handleChange}
              label="Password"
              error={errors.password}
              type="password"
            />
            <button onClick={this.handleSave} className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
