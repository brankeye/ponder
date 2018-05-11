import React from 'react';
import { Text, View, Button } from 'react-native';
import { Screen } from '@@components';
import { ThemeConsumer } from '@@consumers';

class SettingsScreen extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {({ toggleTheme }) => (
          <Screen>
            <Text>Settings!</Text>
            <Button title={'Toggle theme'} onPress={toggleTheme} />
          </Screen>
        )}
      </ThemeConsumer>
    );
  }
}

export default SettingsScreen;
