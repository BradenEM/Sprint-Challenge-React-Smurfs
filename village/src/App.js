import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

const api = "http://localhost:3333/smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get(api)
      .then(response => this.setState({ smurfs: response.data }))
      .catch(err => console.log(err));
  }

  handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${e.target.value}`)
      .then(response => {
        this.setState({ smurfs: response.data });
      });
  };

  render() {
    return (
      <div className="App">
        <Link className="link" to="/">
          Smurfs List
        </Link>
        <Link className="link" to="/form">
          Add A Smurf
        </Link>

        <Route
          path="/"
          exact
          render={() => (
            <Smurfs
              smurfs={this.state.smurfs}
              handleDelete={this.handleDelete}
            />
          )}
        />
        <Route
          path="/form"
          render={() => <SmurfForm smurfs={this.state.smurfs} />}
        />
      </div>
    );
  }
}

export default App;
