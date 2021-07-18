import * as messaging from 'messaging';
import document from 'document';
import { BACKGROUND_COLOUR_KEY } from '../../common/utils';

const initiateMessageListeners = () => {
  const backgroundElement = document.getElementById('background');

  messaging.peerSocket.addEventListener('message', (evt) => {
    if (evt && evt.data && evt.data.key === BACKGROUND_COLOUR_KEY) {
      backgroundElement.style.fill = evt.data.value;
    }
  });
};

export default initiateMessageListeners;
