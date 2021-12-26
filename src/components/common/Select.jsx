import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, options } = this.props;
    return (
      <div className="form-groupe">
        <label htmlFor={name}>{name}</label>
        <select
          onChange={this.handleChange}
          className="form-control"
          name={name}
          id={name}
        >
          {options.map((o) => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };
}

export default Select;
