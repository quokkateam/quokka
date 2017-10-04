import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import CheckInsListItem from './CheckInsListItem';
import Session from '../../utils/Session';

class CheckInsList extends Component {

  constructor(props) {
    super(props);

    this.getCheckIns = this.getCheckIns.bind(this);
    this.getSpinner = this.getSpinner.bind(this);

    this.state = {
      checkIns: this.props.checkIns || []
    };
  }

  componentDidMount() {
    Ajax.get('/api/check_ins')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          checkIns: data.checkIns,
          weekNum: data.weekNum
        });
      });

    return true;
  }

  getCheckIns() {
    var current, disabled;
    return this.state.checkIns.map((c, i) => {
      current = this.state.weekNum === c.weekNum;
      disabled = c.weekNum > this.state.weekNum;
      return <li key={i}><CheckInsListItem current={current} disabled={disabled} weekNum={c.weekNum} checkIn={c}/></li>;
    });
  }

  getSpinner() {
    if (this.state.checkIns.length > 0) {
      return;
    }

    return <div className="circle-fade-spinner primary"></div>;
  }

  render() {
    return (
      <div className="challenges-list-container">
        <div className="challenges-list-intro">
          <div className="intro-title">Weekly Check-ins</div>
          <div className="intro-subtitle">Participating in Check-ins helps you to earn Quokka points, provides us with feedback, and makes you eligible for this week's prizes!</div>
        </div>
        <ul className="check-ins-list">{this.getCheckIns()}</ul>;
        {this.getSpinner()}
      </div>
    );
  }
}

export default CheckInsList;