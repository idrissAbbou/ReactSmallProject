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
              <Route path="/movies" component={Movies} />
              <Route path="/notFound" component={PageNotFound} />
              <Route path="/movie-details/:id?" component={MovieDetails} />
              <Route path="/login" component={LoginForm} />
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
