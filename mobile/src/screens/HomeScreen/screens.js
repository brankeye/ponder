import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Screen, PoemListWithData, AuthorListWithData } from '@@components';
import { StateConsumer } from '@@consumers';

class PoemListScreen extends React.Component {
  handleSelect = async poem => {
    const recents = JSON.parse(await AsyncStorage.getItem('recents')) || [];
    if (poem && !recents.find(p => p.id === poem.id)) {
      recents.unshift(poem);
      await AsyncStorage.setItem('recents', JSON.stringify(recents));
    }
    await this.props.navigation.navigate('Poem', { id: poem.id });
  };

  render() {
    return (
      <StateConsumer stateKey={'Home'}>
        {({ state, setState }) => {
          if (state.searchRequested) {
            console.log(state.searchText);
            setState({ searchRequested: false });
          }
          return (
            <Screen>
              <PoemListWithData
                type={'Default'}
                count={10}
                onSelect={this.handleSelect}
              />
            </Screen>
          );
        }}
      </StateConsumer>
    );
  }
}

class AuthorListScreen extends React.Component {
  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Author', { id });
  };

  render() {
    return (
      <Screen>
        <AuthorListWithData
          type={'Default'}
          count={10}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
