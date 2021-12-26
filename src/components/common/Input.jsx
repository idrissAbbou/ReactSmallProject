import React from "react";

const Input = ({ error, name, label, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        className={`form-control ${error ? "is-invalid" : "is-valid"}`}
        id={name}
        name={name}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default Input;
