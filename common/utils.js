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

export const getMeasurementsSettingsList = () => {
  return [
    {
      name: 'Heart Rate',
      value: MEASUREMENT_CONTAINER_IDS.heartRate
    },
    {
      name: 'Steps',
      value: MEASUREMENT_CONTAINER_IDS.steps
    },
    {
      name: 'Calories',
      value: MEASUREMENT_CONTAINER_IDS.calories
    }
  ];
};
