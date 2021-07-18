import { settingsKeys } from '../common/constants';

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
          settingsKey={settingsKeys.backgroundColour}
          colors={[{ color: '#000000' }, { color: '#ffffff' }]}
        />
      </Section>
      <Section title={getSectionTitle('Seconds Circle')}>
        <Toggle settingsKey={settingsKeys.dynamicSecondsColour} label="Same colour as measurement shown" />
        <ColorSelect
          settingsKey={settingsKeys.secondsColour}
          colors={[
            { color: '#000000' },
            { color: '#ffffff' },
            { color: '#0080ff' },
            { color: '#ff0000' },
            { color: '#ffa500' }
          ]}
        />
      </Section>
      <Section title={getSectionTitle('Text')}>
        <ColorSelect
          settingsKey={settingsKeys.textColour}
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
          settingsKey={settingsKeys}
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
