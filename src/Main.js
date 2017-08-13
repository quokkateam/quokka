import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Challenge from './components/challenge/Challenge';
import CheckIn from './components/check-in/CheckIn';
import FAQ from './components/faq/FAQ';
import Challenges from './components/challenges/Challenges';
import Home from './components/home/Home';
import SignIn from './components/auth/SignIn';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/faq' component={FAQ}/>
          <Route exact path='/signin' component={SignIn}/>
          <Route path='/challenge/week:weekNum' component={Challenge}/>
          <Route exact path='/challenges' component={Challenges}/>
          <Route path='/check-in/week:weekNum' component={CheckIn}/>
          {/* XXX This redirect must go last! */}
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default Main;
