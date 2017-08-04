import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import QuokkaMarkdown from '../shared/QuokkaMarkdown';

class OverviewSubSection extends Component {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = { open: false };
  }
  
  toggleCollapse() {
    this.setState({ open: !this.state.open });
  }
  
  render() {
    return (
      <div className="overview-subsection">
        <div className="challenge-ov-subtitle" onClick={this.toggleCollapse}>{this.props.title}</div>
        <Collapse className="challenge-ov-content" in={this.state.open}>
          <QuokkaMarkdown source={this.props.content} />
        </Collapse>
      </div>
    );
  }
}

export default OverviewSubSection;