import React, { Component } from 'react';
import { View, Text } from '@@components/presenters';
import { PoemList } from '@@components/containers';

class FavoritesPage extends Component {
  handleSelectPoem = poem => {
    this.props.navigation.navigate('Poem', { options: { params: { poem } } });
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
