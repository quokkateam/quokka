import React, { Component } from 'react';
import OverviewSubSection from './OverviewSubSection';

class OverviewSection extends Component {
  constructor(props) {
    super(props);
    this.formatSubSections = this.formatSubSections.bind(this);
  }
  
  formatSubSections() {
    return this.props.overview.map((data, i) => {
      return <OverviewSubSection key={i} title={data.title} content={data.content} />;
    });
  }
  
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='challenge-section-title'>Habit Overview</div>
          <div className='challenge-section-desc'>{this.formatSubSections()}</div>
        </div>
      </div>
    );
  }
}

export default OverviewSection;