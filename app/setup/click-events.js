import * as document from 'document';
import state from '../../common/state';
import { DARK_MEASUREMENT_COLOURS, MEASUREMENT_COLOURS } from '../../common/constants';

const initiateClickEvents = () => {
  const rootElement = document.getElementById('root');
  const secondsBackgroundArc = document.getElementById('seconds-background-arc');
  const secondsArc = document.getElementById('seconds-arc');

  const setMeasurementsVisibility = (currentId, nextId) => {
    const currentEle = document.getElementById(currentId);
    const nextEle = document.getElementById(nextId);

    currentEle.style.visibility = 'hidden';
    nextEle.style.visibility = 'visible';
  };

  const setArcColours = (measurementContainerId) => {
    secondsBackgroundArc.style.fill = DARK_MEASUREMENT_COLOURS[measurementContainerId];
    secondsArc.style.fill = MEASUREMENT_COLOURS[measurementContainerId];
  };

  const displayNextActvity = () => {
    const { measurementContainerIds, currentMeasurementIndex, isDynamicSecondsColour } = state;
    const currentId = measurementContainerIds[currentMeasurementIndex];
    const nextIndex = (currentMeasurementIndex + 1) % measurementContainerIds.length;
    const nextId = measurementContainerIds[nextIndex];

    setMeasurementsVisibility(currentId, nextId);
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
