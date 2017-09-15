import React, { Component } from 'react';

class HashNav extends Component {

  constructor(props) {
    super(props);
    this.getLinks = this.getLinks.bind(this);

    this.state = {
      links: this.props.links || [],
      selectedIndex: this.props.selectedIndex || 0
    };
  }

  getLinks() {
    var classes;

    return this.state.links.map((l, i) => {
      classes = ['hash-nav-link'];

      if (i === this.state.selectedIndex) {
        classes.push('selected');
      }

      return <li key={i}><a href={'#' + l.hash} className={classes.join(' ')}>{l.title}</a></li>;
    });
  }

  render() {
    return (
      <div className="col-md-3">
        <ul className="hash-nav-links">{this.getLinks()}</ul>
      </div>
    );
  }
}

export default HashNav;