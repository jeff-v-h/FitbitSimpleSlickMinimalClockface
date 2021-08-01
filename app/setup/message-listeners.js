import * as messaging from 'messaging';
import {
  getElementById,
  getElementsByClassName,
  getMeasurementsSettingsList,
  getCurrentMeasurement,
  isBackgroundWhite
} from '../../common/utils';
import { SETTINGS_KEYS, COLOURS, MEASUREMENT_COLOURS } from '../../common/constants';
import state from '../../common/state';

const initiateMessageListeners = () => {
  const arcMainToBackgroundColourMap = {
    light: {
      [COLOURS.red]: COLOURS.lightRed,
      [COLOURS.blue]: COLOURS.lightBlue,
      [COLOURS.orange]: COLOURS.lightOrange,
      [COLOURS.black]: COLOURS.lightGrey,
      [COLOURS.white]: COLOURS.darkGrey
    },
    dark: {
      [COLOURS.red]: COLOURS.darkRed,
      [COLOURS.blue]: COLOURS.darkBlue,
      [COLOURS.orange]: COLOURS.darkOrange,
      [COLOURS.black]: COLOURS.lightGrey,
      [COLOURS.white]: COLOURS.darkGrey
    }
  };

  const getMeasurementColour = (measurementColours) => {
    const currentMeasurement = getCurrentMeasurement(state);

    if (!currentMeasurement) {
      return isBackgroundWhite() ? COLOURS.black : COLOURS.white;
    }

    return measurementColours[currentMeasurement];
  };

  const handleDynamicMeasurementTextColourEvent = (isDynamic, measurementTextColour) => {
    const measurementTextElements = getElementsByClassName('unit');
    const colour = isDynamic ? getMeasurementColour(MEASUREMENT_COLOURS) : measurementTextColour;

    measurementTextElements.forEach((e) => (e.style.fill = colour));
  };

  const handleDynamicSecondsColourEvent = (isDynamic, secondsColour) => {
    const secondsArc = getElementById('seconds-arc');
    const secondsBackgroundArc = getElementById('seconds-background-arc');
    const mainSecondsColour = isDynamic ? getMeasurementColour(MEASUREMENT_COLOURS) : secondsColour;

    secondsArc.style.fill = mainSecondsColour;
    const theme = isBackgroundWhite() ? 'light' : 'dark';
    secondsBackgroundArc.style.fill = arcMainToBackgroundColourMap[theme][mainSecondsColour];
    return;
  };

  const handleSecondsColourEvent = (value) => {
    const secondsArc = getElementById('seconds-arc');
    const secondsBackgroundArc = getElementById('seconds-background-arc');
    secondsArc.style.fill = value;
    const theme = isBackgroundWhite() ? 'light' : 'dark';
    secondsBackgroundArc.style.fill = arcMainToBackgroundColourMap[theme][value];
    return;
  };

  const resetDisplayedMeasurement = () => {
    state.currentMeasurementIndex = 0;
    const measurementContainers = getElementsByClassName('measurement-container');
    const currentMeasurement = getCurrentMeasurement(state);

    measurementContainers.forEach((m) => {
      m.style.visibility = m.id === currentMeasurement ? 'visible' : 'hidden';
    });
  };

  const updateMeasurementDependentColours = () => {
    if (state.isDynamicMeasurementTextColour) {
      handleDynamicMeasurementTextColourEvent(true);
    }

    if (state.isDynamicSecondsColour) {
      handleDynamicSecondsColourEvent(true);
    }
  };

  const handleMeasurementsDisplayedEvent = (measurementsToDisplay) => {
    // value = {"values":[{"name":"Steps","value":"steps-container"},{"name":"Calories","value":"calories-container"}],"selected":[2,1]}
    const measurementsList = getMeasurementsSettingsList();
    state.measurementContainerIds = measurementsToDisplay.selected.map((valuesIndex) => measurementsList[valuesIndex]);
    resetDisplayedMeasurement();
    updateMeasurementDependentColours();
  };

  messaging.peerSocket.addEventListener('message', (evt) => {
    if (evt && evt.data) {
      const { key, value } = evt.data;

      if (key === SETTINGS_KEYS.backgroundColour) {
        const backgroundElement = getElementById('background');
        backgroundElement.style.fill = value;
        if (state.isDynamicSecondsColour && state.measurementContainerIds.length === 0) {
          handleDynamicSecondsColourEvent(true);
        }
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

      if (key === SETTINGS_KEYS.measurementsDisplayed) {
        handleMeasurementsDisplayedEvent(value);
        return;
      }

      if (key === SETTINGS_KEYS.dynamicMeasurementTextColour) {
        state.isDynamicMeasurementTextColour = value.isDynamic;
        handleDynamicMeasurementTextColourEvent(value.isDynamic, value.measurementTextColour);
        return;
      }

      if (key === SETTINGS_KEYS.measurementTextColour && !state.dynamicMeasurementTextColour) {
        const measurementTextElements = getElementsByClassName('unit');
        measurementTextElements.forEach((e) => (e.style.fill = value));
        return;
      }

      if (key === SETTINGS_KEYS.dynamicSecondsColour) {
        state.isDynamicSecondsColour = value.isDynamic;
        handleDynamicSecondsColourEvent(value.isDynamic, value.secondsColour);
        return;
      }

      if (key === SETTINGS_KEYS.secondsColour && !state.isDynamicSecondsColour) {
        handleSecondsColourEvent(value);
        return;
      }
    }
  });
};

export default initiateMessageListeners;
