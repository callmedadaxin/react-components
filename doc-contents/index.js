import React, { Component } from "react";
import "../src/styles/index.scss";
// import './example.css'

export default class Wrapper extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
