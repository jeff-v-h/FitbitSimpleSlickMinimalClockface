import * as messaging from 'messaging';
import * as document from 'document';
import { settingsKeys } from '../../common/constants';

const initiateMessageListeners = () => {
  messaging.peerSocket.addEventListener('message', (evt) => {
    if (evt && evt.data) {
      const { data } = evt;

      if (data.key === settingsKeys.backgroundColour) {
        const backgroundElement = document.getElementById('background');
        backgroundElement.style.fill = data.value;
      }

      if (data.key === settingsKeys.dateTextColour) {
        const dateElement = document.getElementById('date');
        dateElement.style.fill = data.value;
      }

      if (data.key === settingsKeys.timeColour) {
        const dateElement = document.getElementById('time');
        dateElement.style.fill = data.value;
      }
    }
  });
};

export default initiateMessageListeners;
