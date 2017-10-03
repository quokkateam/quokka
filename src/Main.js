import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Challenge from './components/challenge/Challenge';
import Challenges from './components/challenges/Challenges';
import CheckIn from './components/check-in/CheckIn';
import DemoCheck from './components/auth/DemoCheck';
import FAQ from './components/faq/FAQ';
import Home from './components/home/Home';
import ResetPasswordCheck from './components/auth/ResetPasswordCheck';
import Session from './utils/Session';
import SetPassword from './components/auth/SetPassword';
import SignIn from './components/auth/SignIn';
import VerifyEmail from './components/auth/VerifyEmail';

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
      },
      {
        path: '/verify-email/:userId/:token',
        comp: VerifyEmail,
        exact: false
      },
      {
        path: '/demo/:token',
        comp: DemoCheck,
        exact: false
      },
      {
        path: '/reset-pw/:token',
        comp: ResetPasswordCheck,
        exact: false
      }
    ];

    this.authedRoutes = [
      {
        path: '/challenge/week:weekNum',
        comp: Challenge,
        exact: false
      },
      {
        path: '/set-password',
        comp: SetPassword,
        exact: true
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
