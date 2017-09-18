import React, { Component } from 'react';

import CheckInsListItem from './CheckInsListItem';

class CheckInsList extends Component {

  constructor(props) {
    super(props);

    this.getCheckIns = this.getCheckIns.bind(this);

    this.state = {
      checkIns: this.props.checkIns || []
    };
  }

  componentDidMount() {
    // Ajax.get('/api/check-ins')
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     this.setState({
    //       checkIns: data.checkIns,
    //       weekNum: data.weekNum
    //     });
    //   });

    return true;
  }

  getCheckIns() {
    return this.state.checkIns.map((c, i) => {
      return <li className="check-ins-list-item-wrapper" key={i}>
        <CheckInsListItem checkIn={c}/>
      </li>;
    });
  }

  render() {
    return (
      <div className="challenges-list-container">
        <div className="challenges-list-intro">
          <div className="intro-title">Weekly Check-ins</div>
          <div className="intro-subtitle">Participating in Check-ins helps you to earn Quokka points, provides us with feedback, and makes you eligible for this week's prizes!</div>
        </div>
        <ul className="check-ins-list no-children">
          <div className="coming-soon">Coming Soon!</div>
        </ul>
      </div>
    );
  }
}

export default CheckInsList;