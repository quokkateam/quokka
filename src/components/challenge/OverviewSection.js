import React, { Component } from 'react';

class OverviewSection extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="challenge-section-title">Habit Overview</div>
          <div className="challenge-section-desc">{this.props.overview}</div>
        </div>
      </div>
    );
  }
}

export default OverviewSection;