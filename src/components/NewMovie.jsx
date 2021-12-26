import Joi from "joi-browser";
import React from "react";
import Form from "./common/Form";
import { getGenres } from "../services/fakeGenreService";
import Select from "./common/Select";
import { insertNewMovie } from "../services/fakeMovieService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import _ from "lodash";

class NewMovie extends Form {
  state = {
    data: { title: "", genre: {}, numberInStock: "", rate: "" },
    genres: [],
    errors: {},
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
  }

  schema = {
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

  doSubmit = (e) => {
    const movie = { ...this.state.data };
    movie._id = _.uniqueId();
    console.log(insertNewMovie(movie));
  };

  render() {
    return (
      <div>
        <form>
          {this.renderInput("title", "Title")}
          <Select
            name="genre"
            options={this.state.genres}
            onChange={this.handleSelectChange}
          />
          {this.renderInput("numberInStock", "Number in stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }

  handleSelectChange = (option) => {
    const data = { ...this.state.data };
    data.genre = this.state.genres.find((g) => g._id === option);
    this.setState({ data });
  };
}

export default NewMovie;
