import React, { Component } from 'react';

import Ajax from '../../utils/Ajax'
import BannerSection from './BannerSection';
import ChallengeSection  from './ChallengeSection';
import CheckInSection from './CheckInSection';
import ExtrasSection from './ExtrasSection';
import GettingStartedSection  from './GettingStartedSection';
import InviteFriendsSection from './InviteFriendsSection';
import OverviewSection from './OverviewSection';
import PrizesSection from './PrizesSection';

class Challenge extends Component {

  constructor(props) {
    super(props);
    
    // use for fetching week info from DB
    this.weekNum = this.props.match.params.weekNum;

    this.setChallengeSectionRef = this.setChallengeSectionRef.bind(this);
    this.setPrizesSectionRef = this.setPrizesSectionRef.bind(this);

    this.state = {
      fetched: false,
      habit: null,
      adjHabits: null,
      overview: null,
      challenge: null,
      prizes: null,
      suggestions: null,
      links: null
    };

    // const formatLink = (i) => `[[${i}]](${links[i - 1]})`;
  }

  setChallengeSectionRef(ref) {
    this.challengeSection = ref;
  }

  setPrizesSectionRef(ref) {
    this.prizesSection = ref;
  }

  componentDidUpdate() {
    if (this.state.fetched) {
      this.challengeSection.setState({ challenge: this.state.challenge });
      this.prizesSection.setState({ prizes: this.state.prizes });
    }
  }

  componentDidMount() {
    // Ajax.get('/api/challenge/' + this.weekNum)
    Ajax.get('/api/schools')
      .then((resp) => resp.json())
      .then((data) => {

        var data = {
          habit: {
            name: 'Exercise',
            icon: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/running-green.png',
            dates: {
              start: 'Oct 15',
              end: 'Oct 22'
            }
          },
          overview: [
            {
              title: 'What’s the science say?',
              content: `Regular physical activity is important for increasing energy and focus,
    strengthening bones and muscles, and increasing longevity.
    It'll also help you manage stress and anxiety and reduce your risk of
    cardiovascular disease and obesity. Even our perceptions and mindsets on
    how physically active we are can predict health and longevity in the
    domains of stress, diet, and obesity.`
            }, {
              title: 'How much exercise should I get?',
              content: `The Physical Activity Guidelines for Americans recommends 2.5 hours per
    week of moderate-intensity aerobic activity (or 75 minutes of more
    vigorous exercise) for good general health. Depending on how intense the
    aerobic activity, you could take a brisk 30-min walk 5x a week or play a
    high-intensity sport for a shorter period. Adding in strength
    training twice a week can help with weight loss and increase your
    resting metabolic rate on top of all this!`
            }, {
              title: 'What are some easy things to do?',
              content: `There are easy ways to incorporate physical activity in your day-to-day.
    Sitting for prolonged periods throughout the day has been linked to
    heart disease and diabetes, and stepping away from the chair or even
    just standing for a few minutes every hour can help reduce these
    negative effects. Choosing to walk
    or bike, taking the stairs, and cleaning your room are easy ways to
    incorporate more physical activity in your day.`
            }, {
              title: 'Should I focus on strength or cardio?',
              content: `It’s important to do both! Strength training is important for building
    muscles, preventing injury, and improving your metabolism. Cardio
    (aerobic exercise that elevates your heart rate) improves heart health,
    helps with weight loss, and increases your metabolism, too.`
            }, {
              title: 'If you’re getting bored, switch it up!',
              content: `Try mixing up your workout—varying your exercise routines will help you
    avoid plateaus in workout performance and also improve adherence.
    Figuring out what activities get you most excited and motivated will be
    key to getting consistent physical activity.`
            }],
          challenge: {
            text: '1. Try 3 different types of exercise this week\n2. Walk or bike instead of driving, and take stairs over elevators\n3. Sit Less, Move More',
            points: 60
          },
          prizes: [
            {
              sponsor: {
                id: 1,
                name: 'The North Face',
                logo: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/thenorthface.png',
                url: 'https://thenorthface.com'
              },
              prize: 'Free pair of shoes'
            },
            {
              sponsor: {
                id: 2,
                name: 'Lululemon',
                logo: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/lululemon.png',
                url: 'https://lululemon.com'
              },
              prize: 'Yoga mat giveaway'
            },
            {
              sponsor: {
                id: 3,
                name: 'Stanford Recreation',
                logo: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/stanford-rec.png',
                url: 'http://recreation.stanford.edu/'
              },
              prize: 'Free personal training session'
            },
            {
              sponsor: {
                id: 4,
                name: 'Stanford Athletics',
                logo: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/stanford-rec.png',
                url: 'http://www.gostanford.com/'
              },
              prize: 'Stanford swag'
            }
          ],
          suggestions: [`Sign up for a [Fitness
       Assessment](http://recreation.stanford.edu/fitness/assessment/) with
       Stanford Recreation.
       `, `Jump into new [Group Fitness
       classes](http://recreation.stanford.edu/fitness/group/) like TRX,
       F45 Cardio, Cardio Kickboxing, or Barre Sculpt.`,
            `Do yoga in Memorial Church as part of the monthly [Om Under the
       Dome](http://events.stanford.edu/events/704/70439/).`,
            `Get together a group of friends, [borrow equipment from the
       gym](http://recreation.stanford.edu/membership/equipment/), and try
       sports like squash, racquetball, and badminton.`,
            `Take free belay lessons, rent shoes for $2 from the Outdoor Center,
       and check out our [gym climbing and bouldering
       hours](http://recreation.stanford.edu/climbing/).`,
            `Check out other recreation spaces beyond ACSR and AOERC – head to
       the [Stanford Driving
       Range](https://golfcourse.stanford.edu/proshop.htm) (only pay for
       the golf balls), [hike the Dish](https://dish.stanford.edu/), or
       choose a [new campus running
       trail](https://www.walkjogrun.net/running-routes/USA/CA/Stanford/)
       created by your peers!`,
            `Seek a little inspiration from our top Stanford athletic teams with
       free [Red Zone](http://gostanford.com/redzone) student tickets.`
          ],
          adjHabits: {
            prev: {
              weekNum: 4, // will be 3
              habit: 'Sleep'
            },
            next: {
              weekNum: 4, // will be 5
              habit: 'Journaling'
            }
          },
          links: [
            'https://www.cdc.gov/physicalactivity/basics/pa-health/index.htm#StrengthenBonesMuscle',
            'http://news.stanford.edu/2017/07/20/self-perceptions-linked-shorter-lifespans/',
            'http://www.health.gov/paguidelines/',
            'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3404815/',
            'https://www.ncbi.nlm.nih.gov/pubmed/25931456',
            'https://health.clevelandclinic.org/2016/02/head-toe-benefits-cardio-workout-infographic/'
          ]
        };

        this.setState({
          fetched: true,
          habit: data.habit,
          adjHabits: data.adjHabits,
          overview: data.overview,
          challenge: data.challenge,
          prizes: data.prizes,
          suggestions: data.suggestions,
          links: data.links
        });
      });
  }

  render() {
    return (
      <div>
        <div id="challenge">
          <BannerSection habit={this.state.habit} weekNum={this.weekNum} adjHabits={this.state.adjHabits} />
          <OverviewSection overview={this.state.overview} />
          <ChallengeSection challenge={this.state.challenge} ref={this.setChallengeSectionRef} />
          <PrizesSection prizes={this.state.prizes} points={(this.state.challenge || {}).points} ref={this.setPrizesSectionRef} />
          <GettingStartedSection suggestions={this.state.suggestions} />
          <CheckInSection weekNum={this.weekNum} endDate={((this.state.habit || {}).dates || {}).end} />
          <ExtrasSection links={this.state.links} />
        </div>
        <InviteFriendsSection />
      </div>
    );
  }
}

export default Challenge;
