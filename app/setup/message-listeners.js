import * as messaging from 'messaging';
import { getElementById } from '../../common/utils';
import { SETTINGS_KEYS, COLOURS, ARC_COLOURS, BACKGROUND_ARC_COLOURS } from '../../common/constants';
import state from '../../common/state';

const initiateMessageListeners = () => {
  const arcMainToBackgroundColourMap = {
    [COLOURS.red]: COLOURS.darkRed,
    [COLOURS.blue]: COLOURS.darkBlue,
    [COLOURS.orange]: COLOURS.darkOrange
  };

  messaging.peerSocket.addEventListener('message', (evt) => {
    if (evt && evt.data) {
      const { key, value } = evt.data;

      if (key === SETTINGS_KEYS.backgroundColour) {
        const backgroundElement = getElementById('background');
        backgroundElement.style.fill = value;
        return;
      }

      if (key === SETTINGS_KEYS.dateTextColour) {
        const dateElement = getElementById('date');
        dateElement.style.fill = value;
        return;
      }

      if (key === SETTINGS_KEYS.timeColour) {
        const dateElement = getElementById('time');
        dateElement.style.fill = value;
        return;
      }

      const secondsArc = getElementById('seconds-arc');
      const secondsBackgroundArc = getElementById('seconds-background-arc');

      if (key === SETTINGS_KEYS.dynamicSecondsColour) {
        state.isDynamicSecondsColour = value.isDynamic;

        if (value.isDynamic) {
          const currentMeasurement = state.measurementContainerIds[state.currentMeasurementIndex];
          secondsArc.style.fill = ARC_COLOURS[currentMeasurement];
          secondsBackgroundArc.style.fill = BACKGROUND_ARC_COLOURS[currentMeasurement];
          return;
        }

        secondsArc.style.fill = value.secondsColour;
        secondsBackgroundArc.style.fill = arcMainToBackgroundColourMap[value.secondsColour];

        return;
      }

      if (key === SETTINGS_KEYS.secondsColour) {
        secondsArc.style.fill = value;
        secondsBackgroundArc.style.fill = arcMainToBackgroundColourMap[value];
        return;
      }
    }
  });
};

export default initiateMessageListeners;
