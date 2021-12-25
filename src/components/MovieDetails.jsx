import React, { Component } from "react";

class MovieDetails extends React.Component {
  handleSave() {
    this.props.history.replace("/");
  }
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <form>
            <h4>Movie Form: {this.props.match.params.id}</h4>
            <button onClick={this.handleSave} className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
