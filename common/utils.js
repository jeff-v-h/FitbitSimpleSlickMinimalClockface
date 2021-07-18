// Add zero in front of numbers < 10
export const zeroPad = (i) => {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
};

export const MONTH_ABBREVIATIONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DAY_ABBREVIATIONS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const stepsId = 'steps-container';
const heartRateId = 'heart-rate-container';
const caloriesId = 'calories-container';
export const MEASUREMENT_CONTAINER_IDS = [stepsId, heartRateId, caloriesId];
export const BACKGROUND_ARC_COLOURS = {
  [stepsId]: '#003366',
  [heartRateId]: '#3f0000',
  [caloriesId]: '#512f11'
};
export const ARC_COLOURS = {
  [stepsId]: '#0080ff',
  [heartRateId]: '#ff0000',
  [caloriesId]: '#ffa500'
};

// Settings keys
export const BACKGROUND_COLOUR_KEY = 'background-colour';
