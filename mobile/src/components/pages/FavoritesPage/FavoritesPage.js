import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { View, Text } from '@@components/presenters';
import { PoemList } from '@@components/containers';

class FavoritesPage extends Component {
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
        <PoemList inLibrary onSelectPoem={this.handleSelectPoem} />
      </View>
    );
  }
}

export default FavoritesPage;
