import { getMeasurementsSettingsList } from './utils';

const state = {
  isDynamicSecondsColour: true,
  isDynamicMeasurementTextColour: false,
  measurementContainerIds: [...getMeasurementsSettingsList()],
  currentMeasurementIndex: 0
};

export default state;
