import React, { Component } from 'react';

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

    // Simulating server-responded payload
    this.data = {
      habit: 'Exercise',
      habitIcon: 'https://s3-us-west-1.amazonaws.com/quokkadev/images/running-green.png',
      weekNum: 4,
      dates: {
        start: 'OCT 15', // TODO: use MM/DD/YYYY and add moment() date formatter library
        end: 'OCT 22'
      },
      overview: [
        {
          title: 'What’s the science say?',
          content: `Regular physical activity is important for increasing energy and focus,
strengthening bones and muscles, and increasing longevity
[[1]](https://www.cdc.gov/physicalactivity/basics/pa-health/index.htm#StrengthenBonesMuscle).
It'll also help you manage stress and anxiety and reduce your risk of
cardiovascular disease and obesity. Even our perceptions and mindsets on
how physically active we are can predict health and longevity in the
domains of stress, diet, and obesity
[[2]](http://news.stanford.edu/2017/07/20/self-perceptions-linked-shorter-lifespans/).`
        }, {
          title: 'How much exercise should I get?',
          content: `The Physical Activity Guidelines for Americans recommends 2.5 hours per
week of moderate-intensity aerobic activity (or 75 minutes of more
vigorous exercise) for good general health. Depending on how intense the
aerobic activity, you could take a brisk 30-min walk 5x a week or play a
high-intensity sport for a shorter period
[[3]](http://www.health.gov/paguidelines/). Adding in strength
training twice a week can help with weight loss and increase your
resting metabolic rate on top of all this!`
        }, {
          title: 'What are some easy things to do?',
          content: `There are easy ways to incorporate physical activity in your day-to-day.
Sitting for prolonged periods throughout the day has been linked to
heart disease and diabetes, and stepping away from the chair or even
just standing for a few minutes every hour can help reduce these
negative effects
[[4]](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3404815/),
[[5]](https://www.ncbi.nlm.nih.gov/pubmed/25931456). Choosing to walk
or bike, taking the stairs, and cleaning your room are easy ways to
incorporate more physical activity in your day.`
        }, {
          title: 'Should I focus on strength or cardio?',
          content: `It’s important to do both! Strength training is important for building
muscles, preventing injury, and improving your metabolism. Cardio
(aerobic exercise that elevates your heart rate) improves heart health,
helps with weight loss, and increases your metabolism, too
[[6]](https://health.clevelandclinic.org/2016/02/head-toe-benefits-cardio-workout-infographic/).`
        }, {
          title: 'If you’re getting bored, switch it up!',
          content: `Try mixing up your workout—varying your exercise routines will help you
avoid plateaus in workout performance and also improve adherence.
Figuring out what activities get you most excited and motivated will be
key to getting consistent physical activity.`
        }],
      challenge: {
        text: `
1. Try 3 different types of exercise this week
2. Walk or bike instead of driving, and take stairs over elevators
3. Sit Less, Move More`,
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
        `Get together a group of friends, [borrow sports equipment from the
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
          weekNum: 3,
          habit: 'Sleep'
        },
        next: {
          weekNum: 5,
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
  }

  render() {
    return (
      <div>
        <div id="challenge">
          <BannerSection habit={this.data.habit} habitIcon={this.data.habitIcon} weekNum={this.data.weekNum} dates={this.data.dates} adjHabits={this.data.adjHabits} />
          <OverviewSection overview={this.data.overview} />
          <ChallengeSection challenge={this.data.challenge} />
          <PrizesSection prizes={this.data.prizes} />
          <GettingStartedSection suggestions={this.data.suggestions} />
          <CheckInSection weekNum={this.data.weekNum} endDate={this.data.dates.end} />
          <ExtrasSection links={this.data.links} />
        </div>
        <InviteFriendsSection />
      </div>
    );
  }
}

export default Challenge;
