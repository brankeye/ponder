import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { PoemList } from 'components/presenters';
import { inject, observer } from 'mobx-react/native';
import composePage from 'components/pages/composePage';

class FavoritesPage extends Component {
  handleSelectPoem = async id => {
    await this.props.poems.selectPoem(id);
    this.props.navigator.push({ screen: pages.PoemPage });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Favorites</Text>
        <PoemList
          poems={this.props.favorites.poemArray}
          onSelectPoem={this.handleSelectPoem}
        />
      </View>
    );
  }
}

const page = inject('favorites', 'poems')(composePage(FavoritesPage));
export default page;