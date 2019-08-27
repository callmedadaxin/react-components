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
      <Link to="/truncate">Truncate</Link>
      <Link to="/dropdown">Dropdown</Link>
      <Link to="/select">Select</Link>
      <Link to="/form">Form</Link>
      <Link to="/smartForm">SmartForm</Link>
      <Link to="/formItem">FormItem</Link>
      <Link to="/setter">Setter</Link>
      <Link to="/table">Table</Link>
      <Link to="/message">Message</Link>
      <Link to="/arealinkage">AreaLinkage</Link>
      <Link to="/timeline">Timeline</Link>
      <Link to="/transfer">Transfer</Link>
      <Link to="/treeselect">TreeSelect</Link>
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
          <Route path="/truncate" component={getComponent("Truncate")} />
          <Route path="/dropdown" component={getComponent("Dropdown")} />
          <Route path="/select" component={getComponent("Select")} />
          <Route path="/formItem" component={getComponent("FormItem")} />
          <Route path="/form" component={getComponent("Form")} />
          <Route path="/smartForm" component={getComponent("SmartForm")} />
          <Route path="/setter" component={getComponent("Setter")} />
          <Route path="/table" component={getComponent("Table")} />
          <Route path="/message" component={getComponent("Message")} />
          <Route path="/arealinkage" component={getComponent("AreaLinkage")} />
          <Route path="/timeline" component={getComponent("Timeline")} />
          <Route path="/transfer" component={getComponent("Transfer")} />
          <Route path="/treeselect" component={getComponent("TreeSelect")} />
        </Switch>
      </Suspense>
    );
  }
}
export default App;
