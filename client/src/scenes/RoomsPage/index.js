import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Dialog } from '@blueprintjs/core';
import { fetchRooms, joinRoom } from '../../actions';
import { getRooms } from '../../selectors';
import NewRoomDialog from './NewRoomDialog';

import './index.css';

class RoomsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newRoomDialogOpen: false };
  }

  handleNewRoomClick(event) {
    event.preventDefault();
    this.setState({ newRoomDialogOpen: true });
  }

  handleNewRoomSubmit(roomName, event) {
    event.preventDefault();
    this.props.dispatch(joinRoom(roomName, true));
  }

  componentWillMount() {
    this.props.dispatch(fetchRooms());
  }

  render() {
    return (
      <div>
        <h1>Your rooms</h1>

        <div style={{ marginTop: 20 }}>
          <a href="#" onClick={this.handleNewRoomClick.bind(this)}>Join a room</a>
        </div>

        <Dialog
          isOpen={this.state.newRoomDialogOpen}
          onClose={() => this.setState({ newRoomDialogOpen: false })}
          iconName="chat"
          title="Join a room">
          <NewRoomDialog onSubmit={this.handleNewRoomSubmit.bind(this)} />
        </Dialog>

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
