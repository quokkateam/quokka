import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import fileDownload from 'js-file-download';

class CheckInResponse extends Component {

  constructor(props) {
    super(props);

    this.getClasses = this.getClasses.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.getOverview = this.getOverview.bind(this);
  }

  getClasses() {
    var classes = ['check-in-response'];

    if (this.props.disabled) {
      classes.push('disabled');
    }

    return classes.join(' ');
  }

  downloadCSV() {
    Ajax.get('/api/check_ins/responses/download/' + this.props.overview.checkInId)
      .then((resp) => {
        if (resp.status === 200) {
          resp.json().then((data) => {
            fileDownload(data.content, data.filename);
          });
        }
      });
  }

  getOverview() {
    if (this.props.disabled) {
      return;
    }

    const respCount = this.props.overview.respCount;
    const respText = respCount + (respCount === 1 ? ' Response' : ' Responses');
    const dlLink = respCount ? <div className="cir-dl-link" onClick={this.downloadCSV}>Download CSV</div> : null;

    return (
      <div className="cir-right">
        {dlLink}
        <div className="num-responses">{respText}</div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.getClasses()}>
        <div className="cir-left">
          <div className="challenge-name">{this.props.challenge.name}</div>
        </div>
        {this.getOverview()}
      </div>
    );
  }
}

export default CheckInResponse;