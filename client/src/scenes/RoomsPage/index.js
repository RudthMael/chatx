import React from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../actions';
import { getRooms } from '../../selectors';

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
            <div>
              <a href="#">{room.name}</a>
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
