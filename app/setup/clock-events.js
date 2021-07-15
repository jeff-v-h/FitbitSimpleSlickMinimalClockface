import clock from 'clock';
import { setSteps, setHeartRate, setCalories } from '../helpers/measurements';
import { updateSecondsBasedArc, setTime, setDate } from '../helpers/date-time';

const initiateClockEvents = () => {
  clock.granularity = 'seconds';

  clock.ontick = (evt) => {
    const now = evt.date;
    updateSecondsBasedArc(now);
    setTime(now);
    setDate(now);

    setSteps();
    setHeartRate();
    setCalories();
  };
};

export default initiateClockEvents;
