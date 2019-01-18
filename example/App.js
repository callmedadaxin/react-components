import React, { Component, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const getComponent = name => {
  const Comp = lazy(() => import(`./${name}`));

  return props => <Comp {...props} />;
};

class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/alert" component={getComponent("Alert")} />
          <Route path="/box" component={getComponent("Box")} />
          <Route path="/loading" component={getComponent("Loading")} />
          <Route path="/noresult" component={getComponent("NoResult")} />
        </Switch>
      </Suspense>
    );
  }
}
export default App;
