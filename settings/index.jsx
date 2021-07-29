import { SETTINGS_KEYS, COLOURS } from '../common/constants';

const getSectionTitle = (title) => (
  <Text bold align="left">
    {title}
  </Text>
);

function SettingsPage(props) {
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
      <Section title={getSectionTitle('Background')}>
        <ColorSelect settingsKey={backgroundColour} colors={[{ color: black }, { color: white }]} />
      </Section>
      <Section title={getSectionTitle('Seconds Circle')}>
        <Toggle settingsKey={dynamicSecondsColour} label="Same colour as displayed measurement" />
        {props.settings[dynamicSecondsColour] === 'false' && (
          <ColorSelect settingsKey={secondsColour} colors={[{ color: blue }, { color: red }, { color: orange }]} />
        )}
      </Section>
      <Section title={getSectionTitle('Date')}>
        <ColorSelect
          settingsKey={dateTextColour}
          colors={[{ color: black }, { color: white }, { color: blue }, { color: red }, { color: orange }]}
        />
      </Section>
      <Section title={getSectionTitle('Time')}>
        <ColorSelect
          settingsKey={timeColour}
          colors={[{ color: black }, { color: white }, { color: blue }, { color: red }, { color: orange }]}
        />
      </Section>
      <Section title={getSectionTitle('Measurements')}>
        <AdditiveList
          settingsKey={SETTINGS_KEYS}
          addAction={
            <Select
              label="Select measurements"
              options={[{ name: 'Heart rate' }, { name: 'Steps' }, { name: 'Calories' }]}
            />
          }
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(SettingsPage);
