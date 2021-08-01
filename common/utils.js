import * as document from 'document';
import { MEASUREMENT_CONTAINER_IDS } from './constants';

// Add zero in front of numbers < 10
export const zeroPad = (i) => {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
};

export const getElementById = (id) => document.getElementById(id);
export const getElementsByClassName = (name) => document.getElementsByClassName(name);

export const getMeasurementsSettingsList = () => [
  MEASUREMENT_CONTAINER_IDS.heartRate,
  MEASUREMENT_CONTAINER_IDS.steps,
  MEASUREMENT_CONTAINER_IDS.calories
];

export const getCurrentMeasurement = (state) => {
  const { measurementContainerIds, currentMeasurementIndex } = state;
  return measurementContainerIds[currentMeasurementIndex];
};
