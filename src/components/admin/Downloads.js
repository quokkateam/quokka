import React, { Component } from 'react';
import DownloadListItem from './DownloadListItem';

class Downloads extends Component {

  constructor(props) {
    super(props);

    this.getDownloadsList = this.getDownloadsList.bind(this);

    this.downloads = [
      {
        name: 'All Users',
        link: '/all_school_users'
      }
    ];
  }

  getDownloadsList() {
    return this.downloads.map((d, i) => {
      return <DownloadListItem key={i} name={d.name} link={d.link} />;
    });
  }

  render() {
    return (
      <div id="downloads">
        <div className="downloads-intro">
          <div className="downloads-title">Downloads</div>
          <div className="downloads-subtitle">Available downloads with valuable insights.</div>
        </div>
        <ul className="downloads-list">{this.getDownloadsList()}</ul>
      </div>
    );
  }
}

export default Downloads;