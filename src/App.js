import "./App.css";
import React, { PureComponent } from "react";
import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";
import MovieDetails from "./components/MovieDetails";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import NewMovie from "./components/NewMovie";

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Switch>
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route exact path="/movies" component={Movies} />
              <Route path="/movies/new" component={NewMovie} />
              <Route path="/movie-details/:id?" component={MovieDetails} />
              <Route path="/notFound" component={PageNotFound} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={Register} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/notFound" />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
