import React from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../../../selectors';
import './index.css';

class MessagesList extends React.Component {
  render() {
    const { messages } = this.props;

    return (
      <div className="messages-list">
        {messages && messages.map((message, index) => (
          <div className="message" key={`message-${index}`}>
            {message}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: getMessages(state)
});

export default connect(mapStateToProps)(MessagesList);
