export const MONTH_ABBREVIATIONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DAY_ABBREVIATIONS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MEASUREMENT_CONTAINER_IDS = Object.freeze({
  steps: 'steps-container',
  heartRate: 'heart-rate-container',
  calories: 'calories-container'
});
export const HEART_RATE_ID = 'heart-rate-container';
export const CALORIES_ID = 'calories-container';
export const BACKGROUND_ARC_COLOURS = Object.freeze({
  [MEASUREMENT_CONTAINER_IDS.steps]: '#003366',
  [MEASUREMENT_CONTAINER_IDS.heartRate]: '#3f0000',
  [MEASUREMENT_CONTAINER_IDS.calories]: '#512f11'
});
export const ARC_COLOURS = Object.freeze({
  [MEASUREMENT_CONTAINER_IDS.steps]: '#0080ff',
  [MEASUREMENT_CONTAINER_IDS.heartRate]: '#ff0000',
  [MEASUREMENT_CONTAINER_IDS.calories]: '#ffa500'
});

// Settings keys
export const settingsKeys = Object.freeze({
  backgroundColour: 'background-colour',
  dynamicSecondsColour: 'dynamic-seconds-colour',
  secondsColour: 'seconds-colour',
  dateTextColour: 'date-text-colour',
  timeColour: 'time-colour',
  measurementTextColour: 'measurement-text-colour',
  measurementsDisplayed: 'measurementsDisplayed'
});
