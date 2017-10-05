import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import FormSelect from '../shared/form/FormSelect';
import WeeklyEmail from './WeeklyEmail';

class WeeklyEmails extends Component {

  constructor(props) {
    super(props);

    this.setWeeklyEmailRef = this.setWeeklyEmailRef.bind(this);
    this.setWeekSelectRef = this.setWeekSelectRef.bind(this);
    this.fetchWeeklyEmail = this.fetchWeeklyEmail.bind(this);
    this.changeWeek = this.changeWeek.bind(this);

    this.state = {
      weekIndex: this.props.weekIndex || 0
    };
  }

  setWeeklyEmailRef(ref) {
    this.weeklyEmail = ref;
  }

  setWeekSelectRef(ref) {
    this.weekSelect = ref;
  }

  componentDidUpdate() {
    this.fetchWeeklyEmail(false);
    return true;
  }

  componentDidMount() {
    this.fetchWeeklyEmail(true);
    return true;
  }

  fetchWeeklyEmail(withWeeks) {
    var weekIndex = this.state.weekIndex || 0;

    Ajax.get('/api/weekly_email/' + weekIndex, { withWeeks: withWeeks })
      .then((resp) => {
        switch (resp.status) {
        case 403:
          console.warn('User is not an admin. Not allowed to view this information');
          break;
        case 200:
          resp.json().then((data) => {
            if (withWeeks) {
              this.weekSelect.setState({
                options: data.weeks,
                defaultValue: '0'
              });
            }

            // HACK - whittlbc (10/04/2017)
            // TODO: Figure out why this.weeklyEmail becomes null on switch away from "Weekly Emails" tab
            if (!this.weeklyEmail) {
              return;
            }

            this.weeklyEmail.setState({
              data: data.week
            });
          });
          break;
        default:
          console.warn('Unexpected status code ' + resp.status + ' while fetching weekly email');
        }
      });
  }

  changeWeek(weekIndex) {
    weekIndex = Number(weekIndex);

    if (weekIndex === this.state.weekIndex) {
      return;
    }

    this.setState({ weekIndex: weekIndex });
  }

  render() {
    return (
      <div id="weeklyEmails">
        <div className="weekly-emails-intro">
          <div className="weekly-emails-title">Weekly Emails</div>
          <div className="weekly-emails-subtitle">Modify the content of your school's Weekly Challenge emails.</div>
          <FormSelect onChange={this.changeWeek} ref={this.setWeekSelectRef}/>
        </div>
        <WeeklyEmail ref={this.setWeeklyEmailRef}/>
      </div>
    );
  }
}

export default WeeklyEmails;