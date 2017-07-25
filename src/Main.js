import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Challenge from './components/challenge/Challenge';
import CheckIn from './components/check-in/CheckIn';
import Habit from './components/habit/Habit';
import Home from './components/home/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

class Main extends Component {

  constructor(props) {
    super(props);
    this.CheckIn = this.CheckIn.bind(this);
  }

  CheckIn(props) {
    var formData = [  // will most likely be an array of CheckInQuestions with their respectjve CheckInAnswers
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
    ];

    var week = {
      num: 4,
      habitName: 'Exercise',
      habitSlug: 'exercise'
    };

    return (
      <CheckIn formData={formData} week={week} {...props}/>
    );
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/challenge' component={Challenge}/>
          <Route path='/habit' component={Habit}/>
          <Route path='/check-in' component={this.CheckIn}/>
        </Switch>
      </div>
    );
  }
}

export default Main;
