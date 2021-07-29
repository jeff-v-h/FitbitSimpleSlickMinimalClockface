export const MONTH_ABBREVIATIONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DAY_ABBREVIATIONS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const COLOURS = Object.freeze({
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  blue: '#0080ff',
  orange: '#ffa500',
  darkRed: '#3f0000',
  darkBlue: '#003366',
  darkOrange: '#512f11'
});

export const MEASUREMENT_CONTAINER_IDS = Object.freeze({
  steps: 'steps-container',
  heartRate: 'heart-rate-container',
  calories: 'calories-container'
});

export const BACKGROUND_ARC_COLOURS = Object.freeze({
  [MEASUREMENT_CONTAINER_IDS.steps]: COLOURS.darkBlue,
  [MEASUREMENT_CONTAINER_IDS.heartRate]: COLOURS.darkRed,
  [MEASUREMENT_CONTAINER_IDS.calories]: COLOURS.darkOrange
});
export const ARC_COLOURS = Object.freeze({
  [MEASUREMENT_CONTAINER_IDS.steps]: COLOURS.blue,
  [MEASUREMENT_CONTAINER_IDS.heartRate]: COLOURS.red,
  [MEASUREMENT_CONTAINER_IDS.calories]: COLOURS.orange
});

// Settings keys
export const SETTINGS_KEYS = Object.freeze({
  backgroundColour: 'background-colour',
  dynamicSecondsColour: 'dynamic-seconds-colour',
  secondsColour: 'seconds-colour',
  dateTextColour: 'date-text-colour',
  timeColour: 'time-colour',
  measurementTextColour: 'measurement-text-colour',
  measurementsDisplayed: 'measurementsDisplayed'
});
