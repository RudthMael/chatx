import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { register } from '../../actions/auth';
import { getAuth } from '../../selectors';

import './index.css';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      password: '',
      submitting: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitting: true });
    this.props.dispatch(register(this.state.name, this.state.username, this.state.password));
  }

  handleNameChange(event) {
    event.preventDefault();

    this.setState({ name: event.target.value });
  }

  handleLoginChange(event) {
    event.preventDefault();

    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    event.preventDefault();

    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="register-page">
        <div className="register-page__form">
          <form onSubmit={this.handleSubmit.bind(this)}>
          <label className="pt-label">
            Name
            <input
              className="pt-input"
              style={{ width: 400 }}
              type="text"
              placeholder="Enter a name"
              dir="auto"
              value={this.state.name}
              onChange={this.handleNameChange.bind(this)}
              disabled={this.props.auth.get('loading')} />
          </label>

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
                disabled={this.props.auth.get('loading')} />
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
                disabled={this.props.auth.get('loading')} />
            </label>

            <div style={{ textAlign: 'center' }}>
              <button type="Submit" className="pt-button" disabled={this.props.auth.get('loading')}>Sign Up</button>
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

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps)(RegisterPage);
