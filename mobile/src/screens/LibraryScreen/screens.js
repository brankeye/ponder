import React from 'react';
import { Text, View } from 'react-native';
import { Screen, PoemListWithData, AuthorListWithData } from '@@components';

class PoemListScreen extends React.Component {
  handleSelect = poem => {
    this.props.navigation.navigate('Poem', { poem });
  };

  render() {
    return (
      <Screen>
        <PoemListWithData
          type={'Library'}
          count={10}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

class AuthorListScreen extends React.Component {
  handleSelect = author => {
    this.props.navigation.navigate('Author', { author });
  };

  render() {
    return (
      <Screen>
        <AuthorListWithData
          type={'Library'}
          count={10}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
