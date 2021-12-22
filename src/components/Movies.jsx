import React from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "../common/LikeButton";
import Pagination from "../common/Pagination";
import { getMoviesToDisplay } from "../utils/Pagination";
import "bootstrap/dist/css/bootstrap.css";
class Movies extends React.Component {
  state = {
    movies: [...getMovies()],
    pageSize: 4,
    currentPage: 1,
  };

  constructor() {
    super();
    this.createMoviesTable = this.createMoviesTable.bind(this);
    this.attachLikeStateToTheMovies();
    this.state.moviesToDisplay = this.state.movies.slice(
      0,
      this.state.pageSize
    );
  }

  attachLikeStateToTheMovies = () => {
    const movies = this.state.movies.map((m) => {
      m.liked = false;
      return m;
    });
    this.setState({ movies });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">{this.renderTopMessage()}</div>
        </div>
        <div className="row">
          <div className="col-12">{this.createMoviesTable()}</div>
        </div>
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <Pagination
              itemsCount={this.state.movies.length}
              pageSize={4}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </div>
    );
  }

  renderTopMessage = () => {
    return this.state.movies.length === 0 ? (
      <h4>there is no movies in the database</h4>
    ) : (
      <h4>showing {this.state.moviesToDisplay.length} movies</h4>
    );
  };

  createMoviesTable() {
    if (this.state.movies.length === 0) return null;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>title</th>
            <th>genre</th>
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
    return this.state.moviesToDisplay.map((movie) => {
      const { _id, title, genre, numberInStock, dailyRentalRate } = movie;
      return (
        <tr key={_id}>
          <td>{title}</td>
          <td> {genre.name} </td>
          <td>{numberInStock}</td>
          <td>{dailyRentalRate}</td>
          <td>
            <LikeButton
              onToggle={this.handleLikeDislike}
              toggle={movie.liked}
              movie={movie}
            />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDeleteMovie(_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  // Evenets Handler

  handleDeleteMovie(id) {
    const movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  }

  handleLikeButtonClasses = (movie) => {
    let classes = "text";
    classes += movie.liked ? "-danger" : "-primary";
    this.setState({ classes });
  };

  handleLikeDislike = (id) => {
    const movies = this.state.movies.map((m) => {
      if (m._id === id) {
        m.liked = !m.liked;
      }
      return m;
    });
    this.setState({ movies });
  };

  handlePageChange = (pageNumber) => {
    const moviesToDisplay = getMoviesToDisplay(
      pageNumber,
      this.state.movies,
      this.state.pageSize
    );
    this.setState({ moviesToDisplay });
    this.setState({ currentPage: pageNumber });
  };
}

export default Movies;
