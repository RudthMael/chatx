import React from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../actions';
import { getRooms } from '../../selectors';
import { Link } from 'react-router';

import './index.css';

class RoomsPage extends React.Component {
  handleNewRoomClick(event) {
    event.preventDefault();
  }

  componentWillMount() {
    this.props.dispatch(fetchRooms());
  }

  render() {
    return (
      <div>
        <h1>Your rooms</h1>

        <div style={{ marginTop: 20 }}>
          <a href="#" onClick={this.handleNewRoomClick.bind(this)}>Create a new room</a>
        </div>

        <div style={{ marginTop: 50 }}>
          {this.props.rooms.map(room => (
            <div key={`room-${room.get('_id')}`} className="room">
              <div className="avatar">
              </div>

              <div className="desc">
                <Link to={`/room/${room.get('_id')}`}>
                  {room.get('name')} ({room.get('users').size})
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rooms: getRooms(state)
});

export default connect(mapStateToProps)(RoomsPage);
