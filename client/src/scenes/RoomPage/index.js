import React from 'react';
import { connect } from 'react-redux';
import { fetchRoom, sendMessage } from '../../actions';
import { getRoom } from '../../selectors';
import MessagesList from './MessagesList';
import UsersList from './UsersList';

import './index.css';

class RoomPage extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired,
    room: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = { message: '' };
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleMessageSendClick(event) {
    event.preventDefault();

    this.props.dispatch(sendMessage(this.state.message));
    this.setState({ message: '' });
  }

  handleMessageKeyDown(event) {
    if (event.defaultPrevented) {
      return;
    }

    const handled = false;

    if (event.key !== undefined) {
      if (event.key === 'Enter' && event.altKey) {
        return this.handleMessageSendClick(event);
      }
    } else if (event.keyIdentifier !== undefined) {
      if (event.keyIdentifier === "Enter" && event.altKey) {
        return this.handleMessageSendClick(event);
      }
    } else if (event.keyCode !== undefined) {
      if (event.keyCode === 13 && event.altKey) {
        return this.handleMessageSendClick(event);
      }
    }

    if (handled) {
       event.preventDefault();
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchRoom(this.props.params.roomId));
  }

  render() {
    const { room } = this.props;

    return (
      <div className="room-page">
        <div>
          <h1>{room.get('name')}</h1>
        </div>

        <div className="chat">
          <div className="messages-box">
            <MessagesList />

            <div className="message-input">
              <textarea
                onChange={this.handleMessageChange.bind(this)}
                onKeyDown={this.handleMessageKeyDown.bind(this)}
                rows="3"
                value={this.state.message}>
              </textarea>

              <button
                type="submit"
                onClick={this.handleMessageSendClick.bind(this)}
                className="pt-button"
                disabled={!this.state.message.length}>
                  Envoyer
              </button>
            </div>
          </div>

          <div style={{ flex: 1 }}></div>

          <UsersList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  room: getRoom(state)
});

export default connect(mapStateToProps)(RoomPage);
