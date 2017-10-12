import React, { Component } from 'react';

import Ajax from '../../utils/Ajax';
import fileDownload from 'js-file-download';

class DownloadListItem extends Component {

  constructor(props) {
    super(props);

    this.downloadCSV = this.downloadCSV.bind(this);
  }

  downloadCSV() {
    Ajax.get('/api/downloads' + this.props.link)
      .then((resp) => {
        if (resp.status === 200) {
          resp.json().then((data) => {
            fileDownload(data.content, data.filename);
          });
        }
      });
  }

  render() {
    return (
      <div className="download-list-item">
        <div className="dl-left">
          <div className="dl-name">{this.props.name}</div>
        </div>
        <div className="dl-right">
          <div className="dl-link" onClick={this.downloadCSV}>Download CSV</div>
        </div>
      </div>
    );
  }
}

export default DownloadListItem;