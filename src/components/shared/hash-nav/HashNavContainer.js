import React, { Component } from 'react';

import HashNav from './HashNav';
import HashContent from './HashContent';

class HashNavContainer extends Component {

  constructor(props) {
    super(props);

    this.setNavRef = this.setNavRef.bind(this);
    this.setContentRef = this.setContentRef.bind(this);
    this.getHash = this.getHash.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.getSelectedIndex = this.getSelectedIndex.bind(this);

    this.state = {
      links: this.props.links || [],
      hash: this.getHash()
    };
  }

  setNavRef(ref) {
    this.nav = ref;
  }

  setContentRef(ref) {
    this.content = ref;

    window.onhashchange = () => {
      this.setState({ hash: this.getHash() });
    };
  }

  componentDidUpdate() {
    var selectedIndex = this.getSelectedIndex();

    this.nav.setState({
      selectedIndex: selectedIndex
    });

    this.content.setState({
      comp: this.state.links[selectedIndex].comp
    });

    return true;
  }

  getHash() {
    var hash = window.location.hash;
    return hash ? hash.substr(1) : null;
  }

  getClassNames() {
    var classes = this.props.classes || [];
    classes.unshift('container-fluid');
    classes.unshift('hash-nav-container');
    return classes.join(' ');
  }

  getSelectedIndex() {
    var index = 0;

    this.state.links.forEach((l, i) => {
      if (l.hash === this.state.hash) {
        index = i;
      }
    });

    return index;
  }

  render() {
    var selectedIndex = this.getSelectedIndex();

    return (
      <div className={this.getClassNames()}>
        <div className="row">
          <HashNav links={this.state.links} selectedIndex={selectedIndex} ref={this.setNavRef}/>
          <HashContent comp={(this.state.links[selectedIndex] || {}).comp} ref={this.setContentRef}/>
        </div>
      </div>
    );
  }
}

export default HashNavContainer;