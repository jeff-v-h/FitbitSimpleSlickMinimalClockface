import document from 'document';
import { MEASUREMENT_CONTAINER_IDS, ARC_COLOURS, BACKGROUND_ARC_COLOURS } from '../../common/constants';

const initiateClickEvents = () => {
  const rootElement = document.getElementById('root');
  const secondsBackgroundArc = document.getElementById('seconds-background-arc');
  const secondsArc = document.getElementById('seconds-arc');
  let currentIndex = 0;

  const setMeasurementsVisibility = (currentId, nextId) => {
    const currentEle = document.getElementById(currentId);
    const nextEle = document.getElementById(nextId);

    currentEle.style.visibility = 'hidden';
    nextEle.style.visibility = 'visible';
  };

  const setArcColours = (measurementContainerId) => {
    secondsBackgroundArc.style.fill = BACKGROUND_ARC_COLOURS[measurementContainerId];
    secondsArc.style.fill = ARC_COLOURS[measurementContainerId];
  };

  const displayNextActvity = () => {
    const currentId = MEASUREMENT_CONTAINER_IDS[currentIndex];
    const nextIndex = (currentIndex + 1) % MEASUREMENT_CONTAINER_IDS.length;
    const nextId = MEASUREMENT_CONTAINER_IDS[nextIndex];

    setMeasurementsVisibility(currentId, nextId);
    setArcColours(nextId);
    currentIndex = nextIndex;
  };

  rootElement.onclick = () => {
    displayNextActvity();
  };
};

export default initiateClickEvents;
