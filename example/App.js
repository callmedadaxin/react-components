import React, { Component, lazy, Suspense } from "react";
import { Route, Switch, Link } from "react-router-dom";

const getComponent = name => {
  const Comp = lazy(() => import(`./${name}`));

  return props => <Comp {...props} />;
};

function Home() {
  return (
    <div>
      <Link to="/alert">Alert</Link>
      <Link to="/box">Box</Link>
      <Link to="/loading">Loading</Link>
      <Link to="/noresult">NoResult</Link>
      <Link to="/button">Button</Link>
      <Link to="/label">Label</Link>
      <Link to="/modal">Modal</Link>
      <Link to="/timepicker">TimePicker</Link>
      <Link to="/tab">Tab</Link>
      <Link to="/pagination">Pagination</Link>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/alert" component={getComponent("Alert")} />
          <Route path="/box" component={getComponent("Box")} />
          <Route path="/loading" component={getComponent("Loading")} />
          <Route path="/noresult" component={getComponent("NoResult")} />
          <Route path="/button" component={getComponent("Button")} />
          <Route path="/label" component={getComponent("Label")} />
          <Route path="/modal" component={getComponent("Modal")} />
          <Route path="/timepicker" component={getComponent("TimePicker")} />
          <Route path="/tab" component={getComponent("Tab")} />
          <Route path="/pagination" component={getComponent("Pagination")} />
        </Switch>
      </Suspense>
    );
  }
}
export default App;
