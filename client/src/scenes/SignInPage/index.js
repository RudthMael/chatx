import React from 'react';
import './index.css';
import { connect } from 'react-redux';
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
      <div className="signin-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
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
    )
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps)(SignInPage);
