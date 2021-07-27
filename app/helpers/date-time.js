import * as document from 'document';
import { preferences } from 'user-settings';
import { zeroPad } from '../../common/utils';
import { DAY_ABBREVIATIONS, MONTH_ABBREVIATIONS } from '../../common/constants';

const secondsArcElement = document.getElementById('seconds-arc');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

const getHours = (now) => {
  let hours = now.getHours();
  return preferences.clockDisplay === '12h' ? hours % 12 || 12 : zeroPad(hours);
};

export const setTime = (now) => {
  const hours = getHours(now);
  const mins = zeroPad(now.getMinutes());
  timeElement.text = `${hours}:${mins}`;
};

export const updateSecondsBasedArc = (now) => (secondsArcElement.sweepAngle = (360 / 60) * now.getSeconds());

export const setDate = (now) => {
  const day = DAY_ABBREVIATIONS[now.getDay()];
  const date = now.getDate();
  const month = MONTH_ABBREVIATIONS[now.getMonth()];
  dateElement.text = `${day}, ${date} ${month}`;
};
