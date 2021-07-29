import { SETTINGS_KEYS } from '../common/constants';

const getSectionTitle = (title) => (
  <Text bold align="left">
    {title}
  </Text>
);

function SettingsPage(props) {
  return (
    <Page>
      <Section title={getSectionTitle('Background')}>
        <ColorSelect
          settingsKey={SETTINGS_KEYS.backgroundColour}
          colors={[{ color: '#000000' }, { color: '#ffffff' }]}
        />
      </Section>
      <Section title={getSectionTitle('Seconds Circle')}>
        <Toggle settingsKey={SETTINGS_KEYS.dynamicSecondsColour} label="Same colour as measurement shown" />
        <ColorSelect
          settingsKey={SETTINGS_KEYS.secondsColour}
          colors={[{ color: '#0080ff' }, { color: '#ff0000' }, { color: '#ffa500' }]}
        />
      </Section>
      <Section title={getSectionTitle('Date')}>
        <ColorSelect
          settingsKey={SETTINGS_KEYS.dateTextColour}
          colors={[
            { color: '#000000' },
            { color: '#ffffff' },
            { color: '#0080ff' },
            { color: '#ff0000' },
            { color: '#ffa500' }
          ]}
        />
      </Section>
      <Section title={getSectionTitle('Time')}>
        <ColorSelect
          settingsKey={SETTINGS_KEYS.timeColour}
          colors={[
            { color: '#000000' },
            { color: '#ffffff' },
            { color: '#0080ff' },
            { color: '#ff0000' },
            { color: '#ffa500' }
          ]}
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
