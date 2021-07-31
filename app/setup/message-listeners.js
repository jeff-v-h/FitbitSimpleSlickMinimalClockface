import * as messaging from 'messaging';
import { getElementById, getElementsByClassName, getMeasurementsSettingsList } from '../../common/utils';
import { SETTINGS_KEYS, COLOURS, MEASUREMENT_COLOURS, DARK_MEASUREMENT_COLOURS } from '../../common/constants';
import state from '../../common/state';

const initiateMessageListeners = () => {
  const arcMainToBackgroundColourMap = {
    [COLOURS.red]: COLOURS.darkRed,
    [COLOURS.blue]: COLOURS.darkBlue,
    [COLOURS.orange]: COLOURS.darkOrange
  };

  const handleDynamicMeasurementTextColourEvent = (isDynamic, measurementTextColour) => {
    const measurementTextElements = getElementsByClassName('unit');
    const { measurementContainerIds, currentMeasurementIndex } = state;
    const currentMeasurement = measurementContainerIds[currentMeasurementIndex];

    measurementTextElements.forEach(
      (e) => (e.style.fill = isDynamic ? MEASUREMENT_COLOURS[currentMeasurement] : measurementTextColour)
    );
  };

  const handleDynamicSecondsColourEvent = (isDynamic, secondsColour) => {
    const secondsArc = getElementById('seconds-arc');
    const secondsBackgroundArc = getElementById('seconds-background-arc');
    const { measurementContainerIds, currentMeasurementIndex } = state;
    const currentMeasurement = measurementContainerIds[currentMeasurementIndex];

    secondsArc.style.fill = isDynamic ? MEASUREMENT_COLOURS[currentMeasurement] : secondsColour;
    secondsBackgroundArc.style.fill = isDynamic
      ? DARK_MEASUREMENT_COLOURS[currentMeasurement]
      : arcMainToBackgroundColourMap[secondsColour];
    return;
  };

  const handleSecondsColourEvent = (value) => {
    const secondsArc = getElementById('seconds-arc');
    const secondsBackgroundArc = getElementById('seconds-background-arc');
    secondsArc.style.fill = value;
    secondsBackgroundArc.style.fill = arcMainToBackgroundColourMap[value];
    return;
  };

  const updateMeasurementDependentColours = () => {
    if (state.isDynamicMeasurementTextColour) {
      handleDynamicMeasurementTextColourEvent(true);
    }

    if (state.isDynamicSecondsColour) {
      handleDynamicSecondsColourEvent(true);
    }
  };

  const updateForNoDisplayedMeasurements = () => {
    // TODO
  };

  const handleMeasurementsDisplayedEvent = (measurementsToDisplay) => {
    // value = {"values":[{"name":"Steps","value":"steps-container"},{"name":"Calories","value":"calories-container"}],"selected":[2,1]}
    const measurementsList = getMeasurementsSettingsList();
    state.measurementContainerIds = measurementsToDisplay.selected.map((valuesIndex) => measurementsList[valuesIndex]);
    state.currentMeasurementIndex = 0;

    if (state.measurementContainerIds.length > 0) {
      updateMeasurementDependentColours();
      return;
    }

    updateForNoDisplayedMeasurements();
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
