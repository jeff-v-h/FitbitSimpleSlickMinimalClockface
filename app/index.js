import clock from 'clock';
import document from 'document';
import { preferences } from 'user-settings';
import { today as userActivityToday } from 'user-activity';
import { HeartRateSensor } from 'heart-rate';
import { battery } from 'power';
import { zeroPad, DAY_ABBREVIATIONS, MONTH_ABBREVIATIONS } from '../common/utils';

// Update the clock every minute
clock.granularity = 'minutes';

// Get a handle on the <text> element
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const stepsElement = document.getElementById('steps');

const getHours = (today) => {
  let hours = today.getHours();
  return preferences.clockDisplay === '12h' ? hours % 12 || 12 : zeroPad(hours);
};

const setTime = (now) => {
  const hours = getHours(now);
  const mins = zeroPad(now.getMinutes());
  timeElement.text = `${hours}:${mins}`;
};

const setDate = (now) => {
  const day = DAY_ABBREVIATIONS[now.getDay()];
  const date = now.getDate();
  const month = MONTH_ABBREVIATIONS[now.getMonth()];
  dateElement.text = `${day}, ${date} ${month}`;
};

const setSteps = () => {
  if (userActivityToday.adjusted != null) {
    stepsElement.text = userActivityToday.adjusted.steps;
    stepsElement.text = 5000;
  } else {
    stepsElement.text = '--';
  }
};

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const now = evt.date;
  setTime(now);
  setDate(now);
  setSteps();
};
