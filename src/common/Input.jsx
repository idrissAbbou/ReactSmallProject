import React from "react";

const Input = ({ error, name, value, label, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        className={`form-control ${error ? "is-invalid" : "is-valid"}`}
        type={type}
        id={name}
        name={name}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default Input;
