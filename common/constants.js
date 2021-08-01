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
  darkOrange: '#512f11',
  darkGrey: '#5c5c5c',
  lightRed: '#ffcccc',
  lightBlue: '#d4ebf2',
  lightOrange: '#ffedcc',
  lightGrey: '#e0e0e0'
});

export const MEASUREMENT_CONTAINER_IDS = Object.freeze({
  heartRate: 'heart-rate-container',
  steps: 'steps-container',
  calories: 'calories-container'
});

export const MEASUREMENT_COLOURS = Object.freeze({
  [MEASUREMENT_CONTAINER_IDS.heartRate]: COLOURS.red,
  [MEASUREMENT_CONTAINER_IDS.steps]: COLOURS.blue,
  [MEASUREMENT_CONTAINER_IDS.calories]: COLOURS.orange
});
export const ARC_MAIN_TO_BACKGROUND_COLOUR_MAP = Object.freeze({
  // background
  [COLOURS.white]: {
    // colour: mappedColourForTheme
    [COLOURS.red]: COLOURS.lightRed,
    [COLOURS.blue]: COLOURS.lightBlue,
    [COLOURS.orange]: COLOURS.lightOrange,
    [COLOURS.black]: COLOURS.lightGrey,
    [COLOURS.white]: COLOURS.darkGrey
  },
  [COLOURS.black]: {
    [COLOURS.red]: COLOURS.darkRed,
    [COLOURS.blue]: COLOURS.darkBlue,
    [COLOURS.orange]: COLOURS.darkOrange,
    [COLOURS.black]: COLOURS.lightGrey,
    [COLOURS.white]: COLOURS.darkGrey
  }
});

// Settings keys
export const SETTINGS_KEYS = Object.freeze({
  backgroundColour: 'background-colour',
  secondsColour: 'seconds-colour',
  dynamicSecondsColour: 'dynamic-seconds-colour',
  dateTextColour: 'date-text-colour',
  timeColour: 'time-colour',
  dynamicMeasurementTextColour: 'dynamic-measurement-text-colour',
  measurementTextColour: 'measurement-text-colour',
  measurementsDisplayed: 'measurements-displayed'
});
