import React from 'react';
import { Text, View, Button } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Screen } from '@@components';
import { SettingsConsumer } from '@@consumers';

class SettingsScreen extends React.Component {
  render() {
    return (
      <SettingsConsumer>
        {({ toggleTheme }) => (
          <Screen>
            <Text>Settings!</Text>
            <Button title={'Toggle theme'} onPress={toggleTheme} />
          </Screen>
        )}
      </SettingsConsumer>
    );
  }
}

export default SettingsScreen;
