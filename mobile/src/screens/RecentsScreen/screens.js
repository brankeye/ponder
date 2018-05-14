import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { PoemList, Screen, Typography } from '@@components';

class PoemListScreen extends React.Component {
  state = { poems: [] };

  async componentDidMount() {
    const recents = JSON.parse(await AsyncStorage.getItem('recents')) || [];
    this.setState({ poems: recents });
  }

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Poem', { id });
  };

  render() {
    const { poems } = this.state;
    return (
      <Screen>
        {poems.length === 0 ? (
          <Typography type={'body'}>{'No poems'}</Typography>
        ) : (
          <PoemList poems={poems} onSelect={this.handleSelect} />
        )}
      </Screen>
    );
  }
}

class AuthorListScreen extends React.Component {
  render() {
    return (
      <Screen>
        <Text>Recent Authors!</Text>
      </Screen>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
