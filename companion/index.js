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
const sendDynamicSecondsData = (val) => {
  const colour = settingsStorage.getItem(secondsColour);
  const valueToSend = `{ "isDynamic": ${val}, "secondsColour": ${colour ?? `"${COLOURS.blue}"`} }`;
  sendValue(dynamicSecondsColour, valueToSend);
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
  sendDynamicSecondsData();
}
