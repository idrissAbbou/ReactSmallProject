import Joi from "joi-browser";
import React from "react";
import Form from "./common/Form";

class Register extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("email"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit() {
    console.log("form submited");
  }
  render() {
    return (
      <div>
        <div className="form">
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderSubmitButton("Register")}
        </div>
      </div>
    );
  }
}

export default Register;
