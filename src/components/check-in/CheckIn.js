import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import CheckInForm from './CheckInForm';

class CheckIn extends Component {

  constructor(props) {
    super(props);
    
    this.weekNum = this.props.match.params.weekNum;

    this.setCheckInFormRef = this.setCheckInFormRef.bind(this);

    this.state = {
      checkInId: null,
      challengeName: null,
      questions: []
    };
  }

  setCheckInFormRef(ref) {
    this.checkInForm = ref;
  }

  componentDidMount() {
    Ajax.get('/api/check_in/' + this.weekNum)
      .then((resp) => {
        if (resp.status === 200) {
          resp.json().then((data) => {
            this.setState({
              checkInId: Number(data.id),
              challengeName: data.challengeName,
              questions: data.questions
            });
          });
        } else {
          this.props.history.goBack();
        }
      });
  }

  componentDidUpdate() {
    if (this.state.checkInId) {
      this.checkInForm.setState({
        checkInId: this.state.checkInId,
        questions: this.state.questions
      });
    }

    return true;
  }

  render() {
    if (!this.state.checkInId) {
      return (<div style={{ minHeight: 1100 }}></div>);
    }

    return (
      <div id="checkIn">
        <div className="check-in-week-info">
          <div className="week-info">Week {this.weekNum} Check-In: {this.state.challengeName}</div>
          <div className="check-in-instruc">
            Let us know how this week went and answer some quick questions to make yourself eligible to win
            <a href={'/challenge/week' + this.weekNum}> this week’s prizes!</a>
          </div>
        </div>
        <CheckInForm questions={this.state.questions} ref={this.setCheckInFormRef} />
      </div>
    );
  }
}

export default CheckIn;