import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../../selectors';
import './index.css';

class UsersList extends React.Component {
  render() {
    const { users } = this.props;

    return (
      <div className="users-box">
        {users && users.map(user => (
          <div className="user" key={`user-${user.get('_id')}`}>
            {user.get('name')}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: getUsers(state)
});

export default connect(mapStateToProps)(UsersList);
