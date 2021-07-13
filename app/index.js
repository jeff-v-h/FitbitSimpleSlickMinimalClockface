import clock from 'clock';
import document from 'document';
import { preferences } from 'user-settings';
import { today as userActivityToday } from 'user-activity';
import { HeartRateSensor } from 'heart-rate';
import { BodyPresenceSensor } from 'body-presence';
import { display } from 'display';
import { battery } from 'power';
import { zeroPad, DAY_ABBREVIATIONS, MONTH_ABBREVIATIONS } from '../common/utils';

// Update the clock every minute
clock.granularity = 'minutes';

// Get a handle on the <text> element
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const stepsElement = document.getElementById('steps');
const heartRateElement = document.getElementById('heart-rate');
const caloriesElement = document.getElementById('calories');

if (HeartRateSensor) {
  const heartRateSensor = new HeartRateSensor();
  heartRateSensor.start();
}

// Disable HRS when watch is not on wrist
if (BodyPresenceSensor && heartRateSensor) {
  const body = new BodyPresenceSensor();
  body.addEventListener('reading', () => {
    if (body.present) {
      heartRateSensor.start();
    } else {
      heartRateSensor.stop();
    }
  });
  body.start();
}

// Disable HRS when screen is off
if (display && heartRateSensor) {
  display.addEventListener('change', () => {
    if (heartRateSensor != null) {
      if (display.on) {
        heartRateSensor.start();
      } else {
        heartRateSensor.stop();
      }
    }
  });
}

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

const setActivityValue = (element, value) => (element.text = value ?? '--');
const setSteps = () => setActivityValue(stepsElement, userActivityToday.adjusted?.steps);
const setHeartRate = () => setActivityValue(heartRateElement, heartRateSensor?.heartRate);
const setCalories = () => setActivityValue(caloriesElement, userActivityToday.adjusted?.steps);

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const now = evt.date;
  setTime(now);
  setDate(now);
  setSteps();
  setHeartRate();
  setCalories();
};
