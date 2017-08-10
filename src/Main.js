import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Challenge from './components/challenge/Challenge';
import CheckIn from './components/check-in/CheckIn';
import Habit from './components/habit/Habit';
import Home from './components/home/Home';
import SignIn from './components/auth/SignIn';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/challenge/week:weekNum' component={Challenge}/>
          <Route path='/challenges' component={Habit}/>
          <Route path='/check-in/week:weekNum' component={CheckIn}/>
          {/* XXX This redirect must go last! */}
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default Main;
