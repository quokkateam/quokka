import React, { Component } from 'react';

class Prize extends Component {
  render() {
    return (
      <div className="prize">
        <img className="sponsor-icon" src={this.props.sponsor.logo} alt=""/>
        <div className="prize-text">{this.props.prize}</div>
        <div className="sponsor-name">{this.props.sponsor.name}</div>
      </div>
    );
  }
}

export default Prize;