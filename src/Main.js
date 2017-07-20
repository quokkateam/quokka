import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Challenge from './components/challenge/Challenge'
import Habit from './components/habit/Habit'
import CheckIn from './components/check-in/CheckIn'

class Main extends Component {
  
  constructor(props) {
    super(props);
    this.CheckIn = this.CheckIn.bind(this)
  }
  
  CheckIn(props) {
    var formData = [
      {
        id: 1,
        type: 'fr-long',
        question: 'How did this week go?',
        answer: 'Answer 1'
      },
      {
        id: 2,
        type: 'fr-long',
        question: 'How did this week go?',
        answer: null
      },
      {
        id: 3,
        type: 'fr-long',
        question: 'How did this week go?',
        answer: ''
      },
      {
        id: 4,
        type: 'fr-long',
        question: 'How did this week go?',
        answer: null
      }
    ];
    
    var week = {
      num: 4,
      habit: 'exercise'
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