import * as document from 'document';
import { today as userActivityToday } from 'user-activity';
import { HeartRateSensor } from 'heart-rate';
import { BodyPresenceSensor } from 'body-presence';
import { display } from 'display';

const stepsElement = document.getElementById('steps');
const heartRateElement = document.getElementById('heart-rate');
const caloriesElement = document.getElementById('calories');

if (HeartRateSensor) {
  const heartRateSensor = new HeartRateSensor();
  heartRateSensor.start();
}

// Disable HRS when watch is not on wrist
if (BodyPresenceSensor && heartRateSensor) {
  const body = new BodyPresenceSensor();
  body.addEventListener('reading', () => {
    if (body.present) {
      heartRateSensor.start();
    } else {
      heartRateSensor.stop();
    }
  });
  body.start();
}

// Disable HRS when screen is off
if (display && heartRateSensor) {
  display.addEventListener('change', () => {
    if (heartRateSensor != null) {
      if (display.on) {
        heartRateSensor.start();
      } else {
        heartRateSensor.stop();
      }
    }
  });
}

const setActivityValue = (element, value) => (element.text = value ?? '--');
export const setSteps = () => setActivityValue(stepsElement, userActivityToday.adjusted?.steps);
export const setHeartRate = () => setActivityValue(heartRateElement, heartRateSensor?.heartRate);
export const setCalories = () => setActivityValue(caloriesElement, userActivityToday.adjusted?.calories);
