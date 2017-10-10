import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import Session from '../../utils/Session';

class VerifyEmail extends Component {

  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  componentDidMount() {
    if (!this.params.hasOwnProperty('userId') || !this.params.hasOwnProperty('token')) {
      window.location = '/';
    }

    try {
      var userId = Number(this.params.userId);
    } catch (e) {
      window.location = '/';
    }

    setTimeout(() => {
      this.verifyEmail(userId, this.params.token);
    }, 500);
  }

  verifyEmail(userId, token) {
    var payload = {
      userId: userId,
      token: token
    };

    Ajax.post('/api/verify_email', payload).then((resp) => {
      if (resp.status === 200) {
        Session.create(resp, () => {
          window.location = '/set-password?from_verify=true';
        });
      } else {
        window.location = '/';
      }
    });
  }

  render() {
    return (
      <div id="verifyEmail">
        <div className="circle-fade-spinner primary"></div>
      </div>
    );
  }
}

export default VerifyEmail;