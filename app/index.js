import clock from 'clock';
import document from 'document';
import { preferences } from 'user-settings';
import { today as userActivityToday } from 'user-activity';
import { HeartRateSensor } from 'heart-rate';
import { BodyPresenceSensor } from 'body-presence';
import { display } from 'display';
import { zeroPad, DAY_ABBREVIATIONS, MONTH_ABBREVIATIONS } from '../common/utils';

// Update the clock every minute
clock.granularity = 'minutes';

// Get a handle on the <text> element
const rootElement = document.getElementById('root');
const secondsArcElement = document.getElementById('seconds-arc-1');
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

const getHours = (now) => {
  let hours = now.getHours();
  return preferences.clockDisplay === '12h' ? hours % 12 || 12 : zeroPad(hours);
};

const setTime = (now) => {
  const hours = getHours(now);
  const mins = zeroPad(now.getMinutes());
  timeElement.text = `${hours}:${mins}`;
};

const updateSecondsBasedArcs = (now) => {
  const seconds = now.getSeconds();

  if (seconds !== 0) {
    const arcToDisplay = document.getElementById('seconds-arc-' + seconds);
    arcToDisplay.style.visibility = 'visible';
  }

  if (seconds !== 1) {
    const previousSeconds = seconds === 0 ? 59 : seconds - 1;
    const arcToHide = document.getElementById('seconds-arc-' + previousSeconds);
    arcToHide.style.visibility = 'hidden';
  }
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
const setCalories = () => setActivityValue(caloriesElement, userActivityToday.adjusted?.calories);

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const now = evt.date;
  setTime(now);
  updateSecondsBasedArcs(now);
  setDate(now);
  setSteps();
  setHeartRate();
  setCalories();
};

let currentIndex = 0;
const MEASUREMENT_CONTAINER_IDS = ['steps-container', 'heart-rate-container', 'calories-container'];

const displayNextActvity = () => {
  const currentId = MEASUREMENT_CONTAINER_IDS[currentIndex];
  const nextIndex = (currentIndex + 1) % MEASUREMENT_CONTAINER_IDS.length;
  const nextId = MEASUREMENT_CONTAINER_IDS[nextIndex];

  const currentEle = document.getElementById(currentId);
  const nextEle = document.getElementById(nextId);

  currentEle.style.visibility = 'hidden';
  nextEle.style.visibility = 'visible';
  currentIndex = nextIndex;
};

rootElement.onclick = () => {
  displayNextActvity();
};
