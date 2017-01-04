import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './index.css';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      submitting: false
    };
  }

  handleSubmit() {
    this.setState({ submitting: true });
  }

  handleLoginChange(event) {
    event.preventDefault();

    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    event.preventDefault();

    this.setState({ password: event.target.value });
  }

  handlePasswordConfirmationChange(event) {
    event.preventDefault();

    this.setState({ passwordConfirmation: event.target.value });
  }

  render() {
    return (
      <div className="register-page">
        <div className="register-page__form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label className="pt-label">
              Username
              <input
                className="pt-input"
                style={{ width: 400 }}
                type="text"
                placeholder="Enter a username"
                dir="auto"
                value={this.state.username}
                onChange={this.handleLoginChange.bind(this)}
                disabled={this.state.submitting} />
            </label>

            <label className="pt-label">
              Password
              <input
                className="pt-input"
                style={{ width: 400 }}
                type="password"
                placeholder="Enter your password"
                dir="auto"
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)}
                disabled={this.state.submitting} />
            </label>

            <label className="pt-label">
              Password confirmation
              <input
                className="pt-input"
                style={{ width: 400 }}
                type="password"
                placeholder="Confirm your password"
                dir="auto"
                value={this.state.passwordConfirmation}
                onChange={this.handlePasswordConfirmationChange.bind(this)}
                disabled={this.state.submitting} />
            </label>

            <div style={{ textAlign: 'center' }}>
              <button type="Submit" className="pt-button" disabled={this.state.submitting}>Sign Up</button>
            </div>
          </form>
        </div>

        <div style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}))(RegisterPage);
