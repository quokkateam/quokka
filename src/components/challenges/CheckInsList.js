import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import CheckInsListItem from './CheckInsListItem';

class CheckInsList extends Component {

  constructor(props) {
    super(props);

    this.getCheckIns = this.getCheckIns.bind(this);

    this.state = {
      checkIns: this.props.checkIns
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
    return this.state.challenges.map((c, i) => {
      return <li className="check-ins-list-item-wrapper" key={i}>
        <CheckInsListItem checkIn={c}/>
      </li>;
    });
  }

  render() {
    return (
      <ul className="check-ins-list">{this.getCheckIns()}</ul>
    );
  }
}

export default CheckInsList;