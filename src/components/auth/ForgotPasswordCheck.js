import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import Session from '../../utils/Session';


class ForgotPasswordCheck extends Component {

  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.forgotPassword = this.forgotPassword.bind(this);
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
      this.forgotPassword(userId, this.params.token);
    }, 500);
  }

  forgotPassword(userId, token) {
    var payload = {
      userId: userId,
      token: token
    };

    Ajax.post('/api/forgot_password', payload).then((resp) => {
      if (resp.status === 200) {
        Session.create(resp, () => {
          window.location = '/set-password';
        });
      } else {
        window.location = '/';
      }
    });
  }

  render() {
    return (
      <div id="forgotPasswordCheck">
        <div className="circle-fade-spinner primary"></div>
      </div>
    );
  }
}

export default ForgotPasswordCheck;