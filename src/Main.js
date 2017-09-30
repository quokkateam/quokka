import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Challenge from './components/challenge/Challenge';
import CheckIn from './components/check-in/CheckIn';
import FAQ from './components/faq/FAQ';
import Challenges from './components/challenges/Challenges';
import Home from './components/home/Home';
import Session from './utils/Session';
import SignIn from './components/auth/SignIn';

class Main extends Component {

  constructor(props) {
    super(props);

    this.baseRoutes = [
      {
        path: '/',
        comp: Home,
        exact: true
      },
      {
        path: '/faq',
        comp: FAQ,
        exact: true
      },
      {
        path: '/signin',
        comp: SignIn,
        exact: true
      }
    ];

    this.authedRoutes = [
      {
        path: '/challenge/week:weekNum',
        comp: Challenge,
        exact: false
      },
      {
        path: '/challenges',
        comp: Challenges,
        exact: true
      },
      {
        path: '/check-in/week:weekNum',
        comp: CheckIn,
        exact: false
      },
      {
        path: '/signout',
        comp: SignIn,
        exact: true
      }
    ];

    this.getRoutes = this.getRoutes.bind(this);
  }

  getRoutes() {
    var routes = this.baseRoutes;

    if (Session.authed()) {
      this.authedRoutes.forEach((route) => {
        routes.push(route);
      });
    }

    return routes.map((route, i) => {
      if (route.exact) {
        return <Route key={i} exact path={route.path} component={route.comp} />;
      } else {
        return <Route key={i} path={route.path} component={route.comp} />;
      }
    });
  }

  render() {
    return (
      <div>
        <Switch>
          {this.getRoutes()}
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default Main;
