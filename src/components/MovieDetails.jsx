import Joi from "joi-browser";
import React from "react";
import { getGenres } from "../services/fakeGenreService";
import {
  getMovie,
  getMovies,
  saveMovie,
  updateMovie,
} from "../services/fakeMovieService";
import Form from "./common/Form";
import Input from "./common/Input";
import Select from "./common/Select";

//TODO: create the details for for a mnovie
class MovieDetails extends Form {
  state = {
    data: {},
    genres: [],
  };

  schena = {
    title: Joi.string().required().label("Title"),
    genre: { _id: Joi.string(), name: Joi.string() },
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(99999)
      .required()
      .label("Number in stock"),
    rate: Joi.number().min(0).max(5).required().label("Rate"),
  };

  constructor(props) {
    super(props);
    this.state.data = getMovie(this.props.match.params.id);
    this.state.genres = getGenres();
  }

  handleSave = (e) => {
    e.preventDefault();
    updateMovie(this.state.data);
    this.props.history.replace("/");
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const movie = { ...this.state.data };
    movie[name] = value;
    this.setState({ data: movie });
  };

  handleSelectChange = (option) => {
    const data = { ...this.state.data };
    data.genre = this.state.genres.find((g) => g._id === option);
    this.setState({ data });
  };

  render() {
    const { title, genre, numberInStock, dailyRentalRate } = this.state.data;
    return (
      <div className="row">
        <div className="col-12">
          <form>
            <Input
              name="title"
              label="Title"
              defaultValue={title}
              onChange={(e) => {
                this.handleChange(e);
              }}
              errors={this.state.errors}
            />
            <Select
              name="genre"
              options={this.state.genres}
              selectedMovieGenre={genre}
              onChange={(e) => {
                this.handleSelectChange(e);
              }}
              errors={this.state.errors}
            />
            <Input
              name="numberInStock"
              label="Number in stock"
              defaultValue={numberInStock}
              onChange={(e) => {
                this.handleChange(e);
              }}
              errors={this.state.errors}
            />
            <Input
              name="dailyRentalRate"
              label="Rate"
              defaultValue={dailyRentalRate}
              onChange={(e) => {
                this.handleChange(e);
              }}
              errors={this.state.errors}
            />
            <button
              onClick={(e) => this.handleSave(e)}
              className="btn btn-primary"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
