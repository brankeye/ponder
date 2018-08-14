import React from 'react';
import { Text, View, Button } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Screen } from '@@components';
import { ThemeConsumer, SettingsConsumer } from '@@consumers';

class SettingsScreen extends React.Component {
  render() {
    return (
      <SettingsConsumer>
        {({ toggleTheme }) => (
          <ThemeConsumer>
            {({ toggleTheme }) => (
              <Screen>
                <Text>Settings!</Text>
                <Button title={'Toggle theme'} onPress={toggleTheme} />
              </Screen>
            )}
          </ThemeConsumer>
        )}
      </SettingsConsumer>
    );
  }
}

export default SettingsScreen;
