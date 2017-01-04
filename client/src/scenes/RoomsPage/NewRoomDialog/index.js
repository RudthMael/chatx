import React from 'react';

export default class NewRoomDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '' };
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit.bind(this, this.state.name)}>
        <div className="pt-dialog-body">
          <label className="pt-label pt-inline">
            Name
            <input
              className="pt-input"
              style={{ width: 400 }}
              type="text"
              placeholder="Enter the room name"
              dir="auto"
              value={this.state.name}
              onChange={this.handleNameChange.bind(this)}
              disabled={this.props.disabled} />
          </label>
        </div>

        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <button
              type="submit"
              className="pt-button pt-intent-primary"
              disabled={this.props.disabled || !this.state.name}>
                Go
            </button>
          </div>
        </div>
      </form>
    );
  }
}
