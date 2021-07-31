import { MEASUREMENT_CONTAINER_IDS } from './constants';

const state = {
  isDynamicSecondsColour: true,
  isDynamicMeasurementTextColour: false,
  measurementContainerIds: [
    MEASUREMENT_CONTAINER_IDS.heartRate,
    MEASUREMENT_CONTAINER_IDS.steps,
    MEASUREMENT_CONTAINER_IDS.calories
  ],
  currentMeasurementIndex: 0
};

export default state;
