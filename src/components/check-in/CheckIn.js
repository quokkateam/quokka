import React, { Component } from 'react';
import CheckInForm from './CheckInForm';

class CheckIn extends Component {

  constructor(props) {
    super(props);
    
    this.weekNum = this.props.match.params.weekNum;
    
    this.data = {
      week: 'Exercise',
      formData: [  // will most likely be an array of CheckInQuestions with their respectjve CheckInAnswers
        {
          id: 1,
          type: 'fr-long',
          question: {
            id: 1,
            text: 'How did you feel about this week\'s challenge?'
          },
          answer: null
        },
        {
          id: 2,
          type: 'fr-long',
          question: {
            id: 2,
            text: 'Did you notice anything new about yourself?'
          },
          answer: null
        },
        {
          id: 3,
          type: 'fr-long',
          question: {
            id: 2,
            text: 'Any other thoughts or feedback on this week or the program?'
          },
          answer: null
        }
      ]
    };
  }

  render() {
    return (
      <div id="checkIn">
        <div className="check-in-week-info">
          <div className="week-info">Week {this.weekNum} Check-In: {this.props.week}</div>
          <div className="check-in-instruc">
            Let us know how this week went and answer some quick questions to make yourself eligible to win
            <a href={'/challenge/week' + this.weekNum}> this week’s prizes!</a>
          </div>
        </div>
        <CheckInForm formData={this.data.formData} />
      </div>
    );
  }
}

export default CheckIn;