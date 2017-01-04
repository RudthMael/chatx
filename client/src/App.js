import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Intent, Position, Toaster } from "@blueprintjs/core";
import { Link } from 'react-router';

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
        <nav className="pt-navbar" style={{ marginBottom: 60 }}>
          <div className="pt-navbar-group pt-align-left">
            <Link to="/" className="pt-button pt-minimal pt-icon-home">
              Home
            </Link>
          </div>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.get('error')
});

export default connect(mapStateToProps)(App);
