import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Alert from './Alert'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/alert" component={Alert} />
      </Switch>
    );
  }
}
export default App;
