import initiateClockEvents from './setup/clock-events';
import initiateClickEvents from './setup/click-events';
import initiateMessageListeners from './setup/message-listeners';

initiateMessageListeners();
initiateClockEvents();
initiateClickEvents();
