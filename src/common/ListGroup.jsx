import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";

class ListGroup extends Component {
  state = {
    genres: [],
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });
  }

  render() {
    return (
      <div>
        <ul className="list-group">{this.renderGenres()}</ul>
      </div>
    );
  }

  renderGenres() {
    const { text, value } = this.props;
    const genres = this.state.genres.map((g) => {
      return (
        <li
          key={g[value]}
          onClick={() => this.props.onGenresChange(g[text])}
          className={
            g[text] === this.props.currentGenres
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {g[text]}
        </li>
      );
    });
    genres.unshift(
      <li
        key="all"
        onClick={() => this.props.onGenresChange("all")}
        className={
          this.props.currentGenres === "all"
            ? "list-group-item active"
            : "list-group-item"
        }
      >
        All
      </li>
    );
    return genres;
  }
}

ListGroup.defaultProps = {
  text: "name",
  value: "_id",
};

export default ListGroup;
