function SettingsPage(props) {
  return (
    <Page>
      <Section
        title={
          <Text bold align="left">
            Background
          </Text>
        }
      >
        <ColorSelect settingsKey="background-colour" colors={[{ color: '#000000' }, { color: '#ffffff' }]} />
      </Section>
      <Section
        title={
          <Text bold align="left">
            Date
          </Text>
        }
      >
        <ColorSelect
          settingsKey="text-colour"
          colors={[
            { color: '#000000' },
            { color: '#ffffff' },
            { color: '#0080ff' },
            { color: '#ff0000' },
            { color: '#ffa500' }
          ]}
        />
      </Section>
      <Section
        title={
          <Text bold align="left">
            Time
          </Text>
        }
      >
        <ColorSelect
          settingsKey="text-colour"
          colors={[
            { color: '#000000' },
            { color: '#ffffff' },
            { color: '#0080ff' },
            { color: '#ff0000' },
            { color: '#ffa500' }
          ]}
        />
      </Section>
      <Section
        title={
          <Text bold align="left">
            Measurement
          </Text>
        }
      >
        <ColorSelect
          settingsKey="text-colour"
          colors={[
            { color: '#000000' },
            { color: '#ffffff' },
            { color: '#0080ff' },
            { color: '#ff0000' },
            { color: '#ffa500' }
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(SettingsPage);
