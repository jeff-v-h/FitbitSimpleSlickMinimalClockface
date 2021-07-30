import { me as companion } from 'companion';
import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { COLOURS, SETTINGS_KEYS } from '../common/constants';

const {
  backgroundColour,
  dateTextColour,
  timeColour,
  measurementTextColour,
  dynamicSecondsColour,
  secondsColour,
  measurementsDisplayed
} = SETTINGS_KEYS;

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

const sendSettingsKeyValue = (key) => sendValue(key, settingsStorage.getItem(key));
const sendDynamicSecondsData = (val) => {
  const colour = settingsStorage.getItem(secondsColour);
  const valueToSend = `{ "isDynamic": ${val}, "secondsColour": ${colour ?? `"${COLOURS.red}"`} }`;
  sendValue(dynamicSecondsColour, valueToSend);
};

const setDefaultSetting = (key, value) => {
  const storedValue = settingsStorage.getItem(key);
  if (storedValue === null) {
    settingsStorage.setItem(key, JSON.stringify(value));
  }
};

// Settings have been changed
settingsStorage.addEventListener('change', (evt) => {
  switch (evt.key) {
    case dynamicSecondsColour:
      sendDynamicSecondsData(evt.newValue);
      break;
    default:
      sendValue(evt.key, evt.newValue);
      break;
  }
});

// Settings were changed while the companion was not running
if (companion.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendSettingsKeyValue(backgroundColour);
  sendSettingsKeyValue(dateTextColour);
  sendSettingsKeyValue(timeColour);
  sendSettingsKeyValue(measurementTextColour);
  sendDynamicSecondsData();
}

const defaults = {
  [backgroundColour]: COLOURS.black,
  [dateTextColour]: COLOURS.white,
  [timeColour]: COLOURS.white,
  [measurementTextColour]: COLOURS.white,
  [dynamicSecondsColour]: true,
  [secondsColour]: COLOURS.black
};

// init
setDefaultSetting(backgroundColour, COLOURS.black);
setDefaultSetting(dateTextColour, COLOURS.white);
setDefaultSetting(timeColour, COLOURS.white);
setDefaultSetting(measurementTextColour, COLOURS.white);
setDefaultSetting(dynamicSecondsColour, true);
setDefaultSetting(secondsColour, COLOURS.red);
