import { me as companion } from 'companion';
import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { settingskeys } from '../common/constants';

const sendSettingData = (data) => {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
};

const sendValue = (key, val) => {
  if (val) {
    const value = JSON.parse(val);
    sendSettingData({ key: key, value: value });
  }
};

// Settings have been changed
settingsStorage.addEventListener('change', (evt) => {
  sendValue(evt.key, evt.newValue);
});

// Settings were changed while the companion was not running
if (companion.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendValue(settingskeys.backgroundColour, settingsStorage.getItem(settingskeys.backgroundColour));
}
