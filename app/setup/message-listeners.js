import * as messaging from 'messaging';
import { getElementById, getElementsByClassName } from '../../common/utils';
import { SETTINGS_KEYS, COLOURS, MEASUREMENT_COLOURS, DARK_MEASUREMENT_COLOURS } from '../../common/constants';
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
        const timeElement = getElementById('time');
        timeElement.style.fill = value;
        return;
      }

      const measurementTextElements = getElementsByClassName('unit');
      const currentMeasurement = state.measurementContainerIds[state.currentMeasurementIndex];

      if (key === SETTINGS_KEYS.dynamicMeasurementTextColour) {
        state.isDynamicMeasurementTextColour = value.isDynamic;

        if (value.isDynamic) {
          measurementTextElements.forEach((e) => (e.style.fill = MEASUREMENT_COLOURS[currentMeasurement]));
          return;
        }

        measurementTextElements.forEach((e) => (e.style.fill = value.measurementTextColour));
      }

      if (key === SETTINGS_KEYS.measurementTextColour && !state.dynamicMeasurementTextColour) {
        measurementTextElements.forEach((e) => (e.style.fill = value));
        return;
      }

      const secondsArc = getElementById('seconds-arc');
      const secondsBackgroundArc = getElementById('seconds-background-arc');

      if (key === SETTINGS_KEYS.dynamicSecondsColour) {
        state.isDynamicSecondsColour = value.isDynamic;

        if (value.isDynamic) {
          secondsArc.style.fill = MEASUREMENT_COLOURS[currentMeasurement];
          secondsBackgroundArc.style.fill = DARK_MEASUREMENT_COLOURS[currentMeasurement];
          return;
        }

        secondsArc.style.fill = value.secondsColour;
        secondsBackgroundArc.style.fill = arcMainToBackgroundColourMap[value.secondsColour];
        return;
      }

      if (key === SETTINGS_KEYS.secondsColour && !state.isDynamicSecondsColour) {
        secondsArc.style.fill = value;
        secondsBackgroundArc.style.fill = arcMainToBackgroundColourMap[value];
        return;
      }
    }
  });
};

export default initiateMessageListeners;
