import * as messaging from 'messaging';
import document from 'document';
import { settingsKeys } from '../../common/constants';

const initiateMessageListeners = () => {
  const backgroundElement = document.getElementById('background');

  messaging.peerSocket.addEventListener('message', (evt) => {
    if (evt && evt.data && evt.data.key === settingsKeys.backgroundColour) {
      backgroundElement.style.fill = evt.data.value;
    }
  });
};

export default initiateMessageListeners;
