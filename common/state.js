import { getMeasurementsSettingsList } from './utils';
import { COLOURS } from './constants';

const state = {
  isDynamicSecondsColour: true,
  isDynamicMeasurementTextColour: false,
  measurementContainerIds: [...getMeasurementsSettingsList()],
  currentMeasurementIndex: 0,
  backgroundColour: COLOURS.black
};

export default state;
