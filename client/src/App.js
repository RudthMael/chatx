import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Intent, Position, Toaster } from "@blueprintjs/core";

class App extends Component {
  componentWillMount() {
    this.toaster = Toaster.create({
      className: "my-toaster",
      position: Position.TOP_CENTER
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.get('message')) {
      this.toaster.clear();
      this.toaster.show({
        message: nextProps.error.get('message'),
        intent: Intent.DANGER
      });
    }
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.get('error')
});

export default connect(mapStateToProps)(App);
