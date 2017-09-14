import $ from 'jquery';
import React, { Component } from 'react';
import QuokkaMarkdown from './QuokkaMarkdown';

const TRANSITION_TIME = 550;

class Banner extends Component {
  
  constructor(props) {
    super(props);
    
    this.status = {
      STATIC: 0,
      UPDATED: 1
    };
    
    this.state = {
      status: this.status.STATIC,
      message: this.props.message,
      buttonText: this.props.buttonText,
      faIcon: this.props.faIcon
    };
    
    this.setBannerRef = this.setBannerRef.bind(this);
    this.update = this.update.bind(this);
    this.getIcon = this.getIcon.bind(this);
    this.getButton = this.getButton.bind(this);
    this.adjustBannerTop = this.adjustBannerTop.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }
  
  componentDidUpdate() {
    if (this.state.status === this.status.UPDATED) {
      this.show();
    }

    return true;
  }
  
  setBannerRef(ref) {
    this.banner = ref;

    $(window).resize(() => {
      if ($(this.banner).css('display') === 'block') {
        this.adjustBannerTop();
      }
    });
  }
  
  update(data) {
    this.setState({
      status: this.status.UPDATED,
      message: data.hasOwnProperty('message') ? data.message : this.state.message,
      buttonText: data.hasOwnProperty('buttonText') ? data.buttonText : this.state.buttonText,
      faIcon: data.hasOwnProperty('faIcon') ? data.faIcon : this.state.faIcon,
    });
  }
  
  getIcon() {
    var classes = [];
    
    if (this.state.faIcon) {
      classes.push('fa');
      classes.push(this.state.faIcon);
    }
    
    classes.push('icon');
    
    return <i className={classes.join(' ')}></i>;
  }
  
  getButton() {
    if (!this.state.buttonText) {
      return;
    }
    
    return <div className="banner-btn" onClick={this.hide}>{this.state.buttonText}</div>;
  }

  adjustBannerTop() {
    $(this.banner).css('top', 'calc(100% - ' + $(this.banner).outerHeight() + 'px)');
  }
  
  show() {
    $(this.banner).show();

    setTimeout(() => {
      this.adjustBannerTop();
    }, 100);
  }
  
  hide() {
    $(this.banner).css('top', '100%');

    setTimeout(() => {
      $(this.banner).hide();
      this.setState({ status: this.status.STATIC });
    }, TRANSITION_TIME);
  }
  
  render() {
    return (
      <div id="banner" ref={this.setBannerRef}>
        {this.getIcon()}
        <div className="message">
          <QuokkaMarkdown source={this.state.message || ''} />
        </div>
        {this.getButton()}
      </div>
    );
  }
}

export default Banner;