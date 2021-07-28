import { MEASUREMENT_CONTAINER_IDS } from './constants';

const state = {
  isDynamicSecondsColour: true,
  measurementContainerIds: [
    MEASUREMENT_CONTAINER_IDS.steps,
    MEASUREMENT_CONTAINER_IDS.heartRate,
    MEASUREMENT_CONTAINER_IDS.calories
  ],
  currentMeasurementId: MEASUREMENT_CONTAINER_IDS.steps
};

export default state;
