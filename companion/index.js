import { me as companion } from 'companion';
import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { COLOURS, SETTINGS_KEYS } from '../common/constants';

const {
  backgroundColour,
  dynamicSecondsColour,
  secondsColour,
  dateTextColour,
  timeColour,
  measurementTextColour,
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

const sendAdditionalData = (key) => {
  if (key === dynamicSecondsColour) {
    const colour = settingsStorage.getItem(secondsColour);
    // colour = `{ "isDynamic": true, "secondsColour": "${COLOURS.blue}" }`;
    sendValue(secondsColour, colour ?? `"${COLOURS.blue}"`);
  }
};

// Settings have been changed
settingsStorage.addEventListener('change', (evt) => {
  sendValue(evt.key, evt.newValue);
  sendAdditionalData(evt.key);
});

// Settings were changed while the companion was not running
if (companion.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendSettingsKeyValue(backgroundColour);
  sendSettingsKeyValue(dateTextColour);
  sendSettingsKeyValue(timeColour);
  sendSettingsKeyValue(dynamicSecondsColour);
  sendSettingsKeyValue(secondsColour);
}
