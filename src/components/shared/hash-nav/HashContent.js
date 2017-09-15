import React, { Component } from 'react';

class HashContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comp: this.props.comp
    };
  }

  render() {
    return (
      <div className="col-md-9 hash-content">{this.state.comp}</div>
    );
  }
}

export default HashContent;