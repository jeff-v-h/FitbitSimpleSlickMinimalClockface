import state from '../../common/state';
import { ARC_MAIN_TO_BACKGROUND_COLOUR_MAP, MEASUREMENT_COLOURS } from '../../common/constants';
import { getElementById, getElementsByClassName } from '../../common/utils';

const initiateClickEvents = () => {
  const rootElement = getElementById('root');
  const secondsBackgroundArc = getElementById('seconds-background-arc');
  const secondsArc = getElementById('seconds-arc');
  const measurementTextElements = getElementsByClassName('unit');

  const setMeasurementsVisibility = (currentId, nextId) => {
    const currentEle = getElementById(currentId);
    const nextEle = getElementById(nextId);

    currentEle.style.visibility = 'hidden';
    nextEle.style.visibility = 'visible';
  };

  const setMeasurementTextColours = (measurementContainerId) =>
    state.isDynamicMeasurementTextColour &&
    measurementTextElements.forEach((e) => (e.style.fill = MEASUREMENT_COLOURS[measurementContainerId]));

  const setArcColours = (measurementContainerId) => {
    if (state.isDynamicSecondsColour) {
      const mainArcColour = MEASUREMENT_COLOURS[measurementContainerId];
      secondsArc.style.fill = mainArcColour;
    }
    secondsBackgroundArc.style.fill =
      ARC_MAIN_TO_BACKGROUND_COLOUR_MAP[state.backgroundColour][secondsArc.style.fill.toLowerCase()];
  };

  const displayNextActvity = () => {
    const { measurementContainerIds, currentMeasurementIndex } = state;
    const currentId = measurementContainerIds[currentMeasurementIndex];
    const nextIndex = (currentMeasurementIndex + 1) % measurementContainerIds.length;
    const nextId = measurementContainerIds[nextIndex];

    setMeasurementsVisibility(currentId, nextId);
    setMeasurementTextColours(nextId);
    setArcColours(nextId);

    state.currentMeasurementIndex = nextIndex;
  };

  rootElement.onclick = () => {
    displayNextActvity();
  };
};

export default initiateClickEvents;
