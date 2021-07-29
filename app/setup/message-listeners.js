import * as messaging from 'messaging';
import * as document from 'document';
import { SETTINGS_KEYS } from '../../common/constants';
import state from '../../common/state';
import { COLOURS } from '../../common/constants';

const initiateMessageListeners = () => {
  messaging.peerSocket.addEventListener('message', (evt) => {
    if (evt && evt.data) {
      const arcMainToBackgroundColourMap = {
        [COLOURS.red]: COLOURS.darkRed,
        [COLOURS.blue]: COLOURS.darkBlue,
        [COLOURS.orange]: COLOURS.darkOrange
      };
      const { key, value } = evt.data;

      if (key === SETTINGS_KEYS.backgroundColour) {
        const backgroundElement = document.getElementById('background');
        backgroundElement.style.fill = value;
        return;
      }

      if (key === SETTINGS_KEYS.dynamicSecondsColour) {
        state.isDynamicSecondsColour = value.isDynamic;
        return;
      }

      if (key === SETTINGS_KEYS.secondsColour) {
        const secondsBackgroundArc = document.getElementById('seconds-background-arc');
        const secondsArc = document.getElementById('seconds-arc');

        secondsBackgroundArc.style.fill = arcMainToBackgroundColourMap[value];
        secondsArc.style.fill = value;
        return;
      }

      if (key === SETTINGS_KEYS.dateTextColour) {
        const dateElement = document.getElementById('date');
        dateElement.style.fill = value;
        return;
      }

      if (key === SETTINGS_KEYS.timeColour) {
        const dateElement = document.getElementById('time');
        dateElement.style.fill = value;
        return;
      }
    }
  });
};

export default initiateMessageListeners;
