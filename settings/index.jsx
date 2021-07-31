import { SETTINGS_KEYS, COLOURS, MEASUREMENT_CONTAINER_IDS } from '../common/constants';

const getSectionTitle = (title) => (
  <Text bold align="left">
    {title}
  </Text>
);

function SettingsPage(props) {
  const colourTitleWord = 'Colour';
  const { black, white, red, blue, orange } = COLOURS;
  const {
    backgroundColour,
    dynamicSecondsColour,
    secondsColour,
    dateTextColour,
    timeColour,
    dynamicMeasurementTextColour,
    measurementTextColour,
    measurementsDisplayed
  } = SETTINGS_KEYS;

  return (
    <Page>
      <Section title={getSectionTitle('Background ' + colourTitleWord)}>
        <ColorSelect settingsKey={backgroundColour} colors={[{ color: black }, { color: white }]} />
      </Section>
      <Section title={getSectionTitle('Date ' + colourTitleWord)}>
        <ColorSelect
          settingsKey={dateTextColour}
          colors={[{ color: white }, { color: black }, { color: blue }, { color: red }, { color: orange }]}
        />
      </Section>
      <Section title={getSectionTitle('Time ' + colourTitleWord)}>
        <ColorSelect
          settingsKey={timeColour}
          colors={[{ color: white }, { color: black }, { color: blue }, { color: red }, { color: orange }]}
        />
      </Section>
      <Section title={getSectionTitle('Measurement List')}>
        <Select
          label="Include"
          multiple
          settingsKey={measurementsDisplayed}
          options={[
            { name: 'Heart Rate', value: MEASUREMENT_CONTAINER_IDS.heartRate },
            { name: 'Steps', value: MEASUREMENT_CONTAINER_IDS.steps },
            { name: 'Calories', value: MEASUREMENT_CONTAINER_IDS.calories }
          ]}
        />
      </Section>
      <Section title={getSectionTitle('Measurement Text')}>
        <Toggle settingsKey={dynamicMeasurementTextColour} label="Match displayed measurement" />
        {props.settings[dynamicMeasurementTextColour] === 'false' && (
          <ColorSelect
            settingsKey={measurementTextColour}
            colors={[{ color: white }, { color: black }, { color: blue }, { color: red }, { color: orange }]}
          />
        )}
      </Section>
      <Section title={getSectionTitle('Seconds Circle ' + colourTitleWord)}>
        <Toggle settingsKey={dynamicSecondsColour} label="Match displayed measurement" />
        {props.settings[dynamicSecondsColour] === 'false' && (
          <ColorSelect settingsKey={secondsColour} colors={[{ color: blue }, { color: red }, { color: orange }]} />
        )}
      </Section>
    </Page>
  );
}

registerSettingsPage(SettingsPage);
