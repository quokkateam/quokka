import React, { Component } from 'react';

import QuokkaMarkdown from '../shared/QuokkaMarkdown';

class OverviewSection extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='challenge-section-title'>Habit Overview</div>
          <div className='challenge-section-desc'>
            <div className='panel-group'>
              <div className='panel panel-default'>
                {this.props.overview.map(({ title, content }, index) =>
                  (<div key={index} >
                    <div className='panel-heading'>
                      <h4 className='panel-title'>
                        {title}
                      </h4>
                    </div>
                    <div className='panel-body'>
                      <QuokkaMarkdown source={content} />
                    </div>
                  </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default OverviewSection;