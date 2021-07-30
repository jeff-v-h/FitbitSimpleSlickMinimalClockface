import { SETTINGS_KEYS, COLOURS } from '../common/constants';

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
    measurementTextColour,
    measurementsDisplayed
  } = SETTINGS_KEYS;

  return (
    <Page>
      <Section title={getSectionTitle('Background ' + colourTitleWord)}>
        <ColorSelect settingsKey={backgroundColour} colors={[{ color: black }, { color: white }]} />
      </Section>
      <Section title={getSectionTitle('Seconds Circle ' + colourTitleWord)}>
        <Toggle settingsKey={dynamicSecondsColour} label="Match displayed measurement" />
        {props.settings[dynamicSecondsColour] === 'false' && (
          <ColorSelect settingsKey={secondsColour} colors={[{ color: blue }, { color: red }, { color: orange }]} />
        )}
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
      <Section title={getSectionTitle('Measurements')}>
        <AdditiveList
          settingsKey={SETTINGS_KEYS}
          addAction={
            <Select
              label="Select what can be displayed"
              options={[{ name: 'Heart rate' }, { name: 'Steps' }, { name: 'Calories' }]}
            />
          }
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(SettingsPage);
