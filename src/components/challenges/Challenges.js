import React, { Component } from 'react';
import WeeklyProgBar from '../widgets/WeeklyProgBar';

class Challenges extends Component {
  
  constructor(props) {
    super(props);

    // from server
    this.data = {
      weekNum: 4,
      weeks: [
        'Socializing',
        'Good Deeds',
        'Sleep',
        'Exercise',
        'Healthy Living',
        'Journaling',
        'Group-Selected Challenge',
        'Positivity & Mindfulness'
      ]
    }
  }
  
  render() {
    return (
      <div id="challenges">
        <div className="prog-bar-wrapper">
          <WeeklyProgBar currentWeekIndex={this.data.weekNum - 1} weeks={this.data.weeks} />
        </div>
      </div>
    );
  }
}

export default Challenges;