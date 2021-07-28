import * as messaging from 'messaging';
import * as document from 'document';
import { settingsKeys } from '../../common/constants';
import state from '../../common/state';
import { BACKGROUND_ARC_COLOURS, ARC_COLOURS } from '../../common/constants';

const initiateMessageListeners = () => {
  messaging.peerSocket.addEventListener('message', (evt) => {
    if (evt && evt.data) {
      const { key, value } = evt.data;

      if (key === settingsKeys.backgroundColour) {
        const backgroundElement = document.getElementById('background');
        backgroundElement.style.fill = value;
        return;
      }

      if (key === settingsKeys.dynamicSecondsColour) {
        const secondsBackgroundArc = document.getElementById('seconds-background-arc');
        const secondsArcElement = document.getElementById('seconds-arc');
        state.isDynamicSecondsColour = value.isDynamic;

        secondsBackgroundArc.style.fill = value.isDynamic
          ? BACKGROUND_ARC_COLOURS[state.currentMeasurementId]
          : value.secondsColour;
        secondsArcElement.style.fill = value.isDynamic ? ARC_COLOURS[state.currentMeasurementId] : value.secondsColour;
        return;
      }

      if (key === settingsKeys.dateTextColour) {
        const dateElement = document.getElementById('date');
        dateElement.style.fill = value;
        return;
      }

      if (key === settingsKeys.timeColour) {
        const dateElement = document.getElementById('time');
        dateElement.style.fill = value;
        return;
      }
    }
  });
};

export default initiateMessageListeners;
