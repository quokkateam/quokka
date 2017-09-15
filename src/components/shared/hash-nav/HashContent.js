import React, { Component } from 'react';

class HashContent extends Component {

  constructor(props) {
    super(props);

    this.compsMap = {};

    this.state = {
      links: this.props.links || [],
      selectedIndex: this.props.selectedIndex || 0
    };
  }

  getComp() {
    const i = this.state.selectedIndex;

    if (!this.compsMap[i]) {
      this.compsMap[i] = (this.state.links[i] || {}).comp;
    }

    return this.compsMap[i];
  }

  render() {
    return (
      <div className="col-md-9 hash-content">{this.getComp()}</div>
    );
  }
}

export default HashContent;