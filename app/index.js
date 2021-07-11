import clock from 'clock';
import document from 'document';
import { preferences, locale } from 'user-settings';
import { today as userActivityToday } from 'user-activity';
import { HeartRateSensor } from 'heart-rate';
import { battery } from 'power';
import * as util from '../common/utils';

// Update the clock every minute
clock.granularity = 'minutes';

// Get a handle on the <text> element
const timeElement = document.getElementById('time');
const stepsElement = document.getElementById('steps');

const getHours = (today) => {
  let hours = today.getHours();
  return preferences.clockDisplay === '12h' ? hours % 12 || 12 : util.zeroPad(hours);
};

const setTime = (evt) => {
  const today = evt.date;
  const hours = getHours(today);
  const mins = util.zeroPad(today.getMinutes());
  timeElement.text = `${hours}:${mins}`;
};

const setSteps = () => {
  if (userActivityToday.adjusted != null) {
    stepsElement.text = userActivityToday.adjusted.steps;
  } else {
    stepsElement.text = '--';
  }
};

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  setTime(evt);
  setSteps();
};
