import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from '@@components/presenters';
import { PoemList } from '@@components/containers';

class FavoritesPage extends Component {
  componentDidMount() {
    this.props.poems.fetchLibrary();
  }

  handleSelectPoem = id => {
    this.props.poems.selectPoem(id);
    this.props.navigation.navigate('Poem');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#EEEEEE',
        }}
      >
        <PoemList
          poems={this.props.poems.library}
          onSelectPoem={this.handleSelectPoem}
        />
      </View>
    );
  }
}

export default FavoritesPage;
