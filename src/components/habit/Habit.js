import React, { Component } from 'react';


const Progress = () => {
  return (
    <section id="progress">
      <div className="bar">
          <p>text</p>
      </div>
    </section>
  )
}

class HabitList extends Component {
  constructor(props) {
    super(props);
    var habit1 = {
      name: "Socializing",
      description: "Social support plays an important role in our behaviors, interactions\n" +
      "and self-image, as well as how we respond to stress.",
      points:80,
      icon:"glyphicon glyphicon-user",
      start:"Aug 21",
      end:"Aug 27"
    };

    var habit2 = {
      name: "Good Deeds",
      description: "A positive feedback loop exists between kindeness and happiness - \n" +
      "the more you do to make other people feel better, the more your own happiness\n" +
      "increases!",
      points:40,
      icon:"glyphicon glyphicon-user",
      start:"Aug 28",
      end:"Sept 3"
    };

    var habit3 = {
      name: "Sleep",
      description: "We all underestimate how big of an effect getting a good night's\n" +
      "sleep can have on your overall health and happiness.",
      points:40,
      icon:"glyphicon glyphicon-user",
      start:"Sept 4",
      end:"Sept 10"
    };

    var habit4 = {
      name: "Healthy Eating",
      description: "Healthy eating has multiple benefits for you. It can help you\n" +
      "stay in shape, increase your energy and boost your immune system.",
      points:60,
      icon:"glyphicon glyphicon-user",
      start:"Sept 11",
      end:"Sept 17"
    };
    this.habitlist = [habit1,habit2,habit3,habit4];
  }

  render () {
    return (
      <tbody>
      {this.habitlist.map(function(habit,i){
        return (
          <div className="row habit-item">
            <div className="col-md-1 icon">
              <span className={habit.icon}></span>
            </div>
            <div className="col-md-9">
              <p className="habit-item-title">{habit.name}</p>
              <p>{habit.description}</p>
            </div>
            <div className="col-md-2">
                <div className="row">
                  <p className="date">{habit.start} - {habit.end}</p>
                </div>
              <tbody>
                <tr>
                  <th><p className="icon-right">{habit.points}</p></th>
                  <th><span className="glyphicon glyphicon-leaf icon-right"></span></th>
                </tr>
              </tbody>
            </div>
        </div>);
      })}
      </tbody>
    );
  }
}

class Habit extends Component {
  render() {
    return (


      <div>
        <div className="row">
          <Progress />
        </div>
        <div id="habit" className="row">
          <div id="column1" className="col-md-3">
           <ul>
            <li>Habits</li>
            <li>Check-ins</li>
            <li>Leaderboard</li>
            <li>Campus Reps</li>
           </ul>
          </div>

          <div id="column2" className="col-md-9">
           <h1 className="habit-section-title">Weekly Habit Challenges</h1>
           <p className="overview-text">Check out the weekly challenge breakdown below. Each week introduces
           a separate healthy habit which you and your friends can participate in and
           earn points for doing so.</p>
           <HabitList />
          </div>
        </div>
      </div>
    );
  }
}

export default Habit;
