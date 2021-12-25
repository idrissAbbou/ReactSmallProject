import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/Pagination";
import { getMoviesToDisplay } from "../utils/Pagination";
import ListGroup from "../common/ListGroup";
import MoviesTable from "./MoviesTable";
import "bootstrap/dist/css/bootstrap.css";
import TopMessage from "./TopMessage";
import NavBar from "./NavBar";

class Movies extends Component {
  state = {
    movies: [],
    moviesToDisplay: [],
    moviesCatalog: [],
    pageSize: 4,
    currentPage: 1,
    currentGenres: "all",
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  constructor() {
    super();
    this.attachLikeStateToTheMovies();
  }

  componentDidMount() {
    const moviesToDisplay = getMovies().slice(0, this.state.pageSize);
    this.setState({
      movies: getMovies(),
      moviesToDisplay,
      moviesCatalog: getMovies(),
    });
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
          <div className="col-3">
            <ListGroup
              currentGenres={this.state.currentGenres}
              onGenresChange={this.handleOnGenresChanges}
            />
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-12">
                <TopMessage itemsCount={this.state.moviesCatalog.length} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <MoviesTable
                  movies={this.state.movies}
                  moviesToDisplay={this.state.moviesToDisplay}
                  handleDeleteMovie={this.handleDeleteMovie}
                  handleLikeDislike={this.handleLikeDislike}
                  onSort={this.handleOnSort}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <Pagination
                  itemsCount={this.state.moviesCatalog.length}
                  pageSize={4}
                  onPageChange={this.handlePageChange}
                  currentPage={this.state.currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
      this.state.moviesCatalog,
      this.state.pageSize
    );
    this.setState({ moviesToDisplay });
    this.setState({ currentPage: pageNumber });
  };

  handleOnGenresChanges = (genres) => {
    let moviesCatalog = [];
    if (genres === "all") {
      moviesCatalog = [...this.state.movies];
    } else {
      moviesCatalog = this.state.movies.filter((m) => m.genre.name === genres);
    }
    const moviesToDisplay = getMoviesToDisplay(
      this.state.currentPage,
      moviesCatalog,
      this.state.pageSize
    );
    this.setState({
      currentGenres: genres,
      moviesCatalog,
      moviesToDisplay,
      currentPage: 1,
    });
  };

  handleOnSort = (predicate) => {
    let moviesCatalog = [];
    if (predicate === "title") {
      moviesCatalog = this.state.moviesCatalog.sort((m1, m2) =>
        m1.title.localeCompare(m2.title)
      );
      this.setState({ sortColumn: { path: "title", order: "asc" } });
    } else {
      moviesCatalog = this.state.moviesCatalog.sort((m1, m2) =>
        m1.genre.name.localeCompare(m2.genre.name)
      );
      this.setState({ sortColumn: { path: "genre", order: "asc" } });
    }
    const moviesToDisplay = getMoviesToDisplay(
      1,
      this.state.moviesCatalog,
      this.state.pageSize
    );
    this.setState({ moviesCatalog, currentPage: 1, moviesToDisplay });
  };
}

export default Movies;
