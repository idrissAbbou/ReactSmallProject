import React, { Component } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../common/LikeButton";

class MoviesTable extends React.Component {
  render() {
    return <div>{this.createMoviesTable()}</div>;
  }

  createMoviesTable() {
    if (this.props.movies.length === 0) return null;
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.props.onSort("title")}>title</th>
            <th onClick={() => this.props.onSort("genre")}>genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{this.formatMovies()}</tbody>
      </table>
    );
  }

  formatMovies() {
    return this.props.moviesToDisplay.map((movie) => {
      const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
      return (
        <tr key={_id}>
          <td>
            <Link to={`/movie-details/${_id}`}>{title}</Link>{" "}
          </td>
          <td> {genre.name} </td>
          <td>{numberInStock}</td>
          <td>{dailyRentalRate}</td>
          <td>
            <LikeButton
              onToggle={this.props.handleLikeDislike}
              toggle={movie.liked}
              movie={movie}
            />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.props.handleDeleteMovie(_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
}

export default MoviesTable;
