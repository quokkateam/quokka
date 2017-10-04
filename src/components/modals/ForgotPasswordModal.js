import React from 'react';
import Ajax from '../../utils/Ajax';
import EmailInput from '../shared/form/EmailInput';
import ModalAction1Btn from './ModalAction1Btn';
import QuokkaModal from '../shared/QuokkaModal';

class ForgotPasswordModal extends QuokkaModal {

  constructor(props) {
    super(props);

    this.status = {
      STATIC: 0,
      SERIALIZING: 1,
      SENDING: 2
    };

    this.setEmailRef = this.setEmailRef.bind(this);
    this.serialize = this.serialize.bind(this);
    this.submit = this.submit.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.state = {
      showModal: false,
      status: this.status.STATIC,
      email: null
    };
  }

  setEmailRef(ref) {
    this.emailInput = ref;
  }

  componentDidUpdate() {
    if (this.state.status === this.status.SERIALIZING && this.emailInput.isValid()) {
      this.setState({ status: this.status.SENDING });
    } else if (this.state.status === this.status.SENDING) {
      this.submit();
    }

    return true;
  }

  serialize() {
    this.setState({
      email: this.emailInput.serialize(),
      status: this.status.SERIALIZING
    });
  }

  submit() {
    Ajax.post('/api/trigger_forgot_pw_email', { email: this.state.email })
      .then((resp) => {
        if (resp.status === 200) {
          setTimeout(() => {
            this.setState({
              showModal: false,
              status: this.status.STATIC,
              email: null
            });
          });
        }
      });
  }

  onKeyUp(_, e) {
    if (e.which === 13) { // Enter
      this.serialize();
    }
  }

  getHeader() {
    return <span style={{ position: 'relative', top: 3 }}>Forgot Password</span>;
  }

  getBody() {
    return (
      <div id="forgotPasswordModalBody">
        <div className="center-modal-question">
          Type in your Quokka email, and we'll send you a link to reset your password.
        </div>
        <EmailInput required={true} disabled={this.state.status !== this.status.STATIC} placeholder="Quokka Email" onKeyUp={this.onKeyUp} ref={this.setEmailRef}/>
      </div>
    );
  }

  getFooter() {
    return <ModalAction1Btn onClick={this.serialize} sending={this.state.status === this.status.SENDING} text="Send Email"/>;
  }
}

export default ForgotPasswordModal;