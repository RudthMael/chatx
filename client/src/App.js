import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Intent, Position, Toaster } from "@blueprintjs/core";

class App extends Component {
  constructor(props) {
    super(props);

    this.toaster = Toaster.create({
      className: "my-toaster",
      position: Position.TOP_CENTER
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.error.get('message') !== nextProps.error.get('message')) {
      this.toaster.show({
        message: nextProps.error.get('message'),
        intent: Intent.DANGER
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div>{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.get('error')
});

export default connect(mapStateToProps)(App);
