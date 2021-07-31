import { me as companion } from 'companion';
import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { COLOURS, SETTINGS_KEYS, MEASUREMENT_CONTAINER_IDS } from '../common/constants';

const {
  backgroundColour,
  dateTextColour,
  timeColour,
  dynamicMeasurementTextColour,
  measurementTextColour,
  secondsColour,
  dynamicSecondsColour,
  measurementsDisplayed
} = SETTINGS_KEYS;
const keys = Object.keys(SETTINGS_KEYS);
const settingsKeyDefaultValues = {
  [backgroundColour]: COLOURS.black,
  [dateTextColour]: COLOURS.white,
  [timeColour]: COLOURS.white,
  [dynamicMeasurementTextColour]: false,
  [measurementTextColour]: COLOURS.white,
  [dynamicSecondsColour]: true,
  [secondsColour]: COLOURS.black,
  [measurementsDisplayed]: {
    values: [
      {
        name: 'Heart Rate',
        value: MEASUREMENT_CONTAINER_IDS.heartRate
      },
      {
        name: 'Steps',
        value: MEASUREMENT_CONTAINER_IDS.steps
      },
      {
        name: 'Calories',
        value: MEASUREMENT_CONTAINER_IDS.calories
      }
    ],
    selected: [0, 1, 2]
  }
};

const sendSettingData = (data) => {
  const { readyState, OPEN } = messaging.peerSocket;
  // If we have a MessageSocket, send the data to the device
  if (readyState === OPEN) {
    messaging.peerSocket.send(data);
  }
};

const sendValue = (key, val) => {
  if (val) {
    const value = JSON.parse(val);
    sendSettingData({ key, value });
  }
};

const sendDynamicSecondsData = (val) => {
  const colour = settingsStorage.getItem(secondsColour);
  const valueToSend = `{ "isDynamic": ${val}, "secondsColour": ${colour} }`;
  sendValue(dynamicSecondsColour, valueToSend);
};

const sendDynamicMeasurementTextData = (val) => {
  const colour = settingsStorage.getItem(measurementTextColour);
  const valueToSend = `{ "isDynamic": ${val}, "measurementTextColour": ${colour} }`;
  sendValue(dynamicMeasurementTextColour, valueToSend);
};

const setKeyValue = (key, val) => {
  switch (key) {
    case dynamicMeasurementTextColour:
      sendDynamicMeasurementTextData(val);
      break;
    case dynamicSecondsColour:
      sendDynamicSecondsData(val);
      break;
    default:
      sendValue(key, val);
      break;
  }
};

const setDefaultSetting = (key, value) => {
  const storedValue = settingsStorage.getItem(key);
  if (storedValue === null) {
    settingsStorage.setItem(key, JSON.stringify(value));
  }
};

// Settings have been changed
settingsStorage.addEventListener('change', (evt) => {
  setKeyValue(evt.key, evt.newValue);
});

// Send values when settings were changed whilst the companion was not running
if (companion.launchReasons.settingsChanged) {
  keys.forEach((key) => setKeyValue(key, settingsStorage.getItem(key)));
}

// init defaults
keys.forEach((key) => setDefaultSetting(key, settingsKeyDefaultValues[key]));
setTimeout(() => keys.forEach((key) => setKeyValue(key, settingsStorage.getItem(key))), 1000);
