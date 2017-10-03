import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import Session from '../../utils/Session';


class ResetPasswordCheck extends Component {

  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.verifyToken = this.verifyToken.bind(this);
  }

  componentDidMount() {
    if (!this.params.token) {
      window.location = '/';
    }

    setTimeout(() => {
      this.verifyToken(this.params.token);
    }, 500);
  }

  verifyToken(token) {
    Ajax.post('/api/verify_reset_pw_token', { token: token })
      .then((resp) => {
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
      <div id="resetPasswordCheck">
        <div className="circle-fade-spinner primary"></div>
      </div>
    );
  }
}

export default ResetPasswordCheck;