import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import WeeklyProgBar from '../widgets/WeeklyProgBar';

class Challenges extends Component {
  
  constructor(props) {
    super(props);

    this.setProgBarRef = this.setProgBarRef.bind(this);

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
    };
  }

  setProgBarRef(ref) {
    this.progBar = ref;
  }

  componentDidMount() {
    Ajax.get('/api/challenges')
      .then((resp) => resp.json())
      .then((data) => {
        this.progBar.setState({
          challenges: data.challenges,
          weekNum: data.weekNum
        });
      });
  }
  
  render() {
    return (
      <div id="challenges">
        <div className="prog-bar-wrapper">
          <WeeklyProgBar ref={this.setProgBarRef}/>
        </div>
      </div>
    );
  }
}

export default Challenges;