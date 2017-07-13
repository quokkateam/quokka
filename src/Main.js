import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Challenge from './components/challenge/Challenge'
import Habit from './components/habit/Habit'
import CheckIn from './components/check-in/CheckIn'

class Main extends Component {
	render() {
		return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/challenge' component={Challenge}/>
          <Route path='/habit' component={Habit}/>
          <Route path='/check-in' component={CheckIn}/>
        </Switch>
      </div>
		);
	}
}

export default Main;