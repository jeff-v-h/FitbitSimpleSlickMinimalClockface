import document from 'document';
import { MEASUREMENT_CONTAINER_IDS } from '../../common/utils';

const initiateClickEvents = () => {
  const rootElement = document.getElementById('root');
  let currentIndex = 0;

  const displayNextActvity = () => {
    const currentId = MEASUREMENT_CONTAINER_IDS[currentIndex];
    const nextIndex = (currentIndex + 1) % MEASUREMENT_CONTAINER_IDS.length;
    const nextId = MEASUREMENT_CONTAINER_IDS[nextIndex];

    const currentEle = document.getElementById(currentId);
    const nextEle = document.getElementById(nextId);

    currentEle.style.visibility = 'hidden';
    nextEle.style.visibility = 'visible';
    currentIndex = nextIndex;
  };

  rootElement.onclick = () => {
    displayNextActvity();
  };
};

export default initiateClickEvents;
