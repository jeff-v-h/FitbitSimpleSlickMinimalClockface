import state from '../../common/state';
import { DARK_MEASUREMENT_COLOURS, MEASUREMENT_COLOURS } from '../../common/constants';
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
    measurementTextElements.forEach((e) => (e.style.fill = MEASUREMENT_COLOURS[measurementContainerId]));

  const setArcColours = (measurementContainerId) => {
    secondsBackgroundArc.style.fill = DARK_MEASUREMENT_COLOURS[measurementContainerId];
    secondsArc.style.fill = MEASUREMENT_COLOURS[measurementContainerId];
  };

  const displayNextActvity = () => {
    const { measurementContainerIds, currentMeasurementIndex, isDynamicSecondsColour, isDynamicMeasurementTextColour } =
      state;
    const currentId = measurementContainerIds[currentMeasurementIndex];
    const nextIndex = (currentMeasurementIndex + 1) % measurementContainerIds.length;
    const nextId = measurementContainerIds[nextIndex];

    setMeasurementsVisibility(currentId, nextId);
    if (isDynamicMeasurementTextColour) {
      setMeasurementTextColours(nextId);
    }

    if (isDynamicSecondsColour) {
      setArcColours(nextId);
    }

    state.currentMeasurementIndex = nextIndex;
  };

  rootElement.onclick = () => {
    displayNextActvity();
  };
};

export default initiateClickEvents;
