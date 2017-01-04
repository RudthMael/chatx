import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { login } from '../../actions';
import { getAuth } from '../../selectors';

class SignInPage extends React.Component {
  static propTypes = {
    auth: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = { username: '', password: '' };
  }

  handleLoginChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.dispatch(login(this.state.username, this.state.password));
  }

  render() {
    return (
      <div className="signin-page">
        <div className="signin-page__form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label className="pt-label">
              Username
              <input
                className="pt-input"
                style={{ width: 400 }}
                type="text"
                placeholder="Username"
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
                placeholder="Password"
                dir="auto"
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)}
                disabled={this.props.auth.get('loading')} />
            </label>

            <div style={{ textAlign: 'center' }}>
              <button type="Submit" className="pt-button" disabled={this.state.loading}>Log In</button>
            </div>
          </form>
        </div>

        <div style={{ textAlign: 'center' }}>
          No account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps)(SignInPage);
