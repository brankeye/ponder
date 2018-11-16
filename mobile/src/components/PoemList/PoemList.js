import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { PoemCard, FadeIn } from '@@components';
import * as Animatable from 'react-native-animatable';

class PoemList extends Component {
  keyExtractor = ({ id }) => id;

  renderItem = ({ item }) => (
    <PoemCard
      poem={item}
      onPress={this.props.onSelect}
      showViewedAt={this.props.type === 'Recents'}
    />
  );

  render() {
    const { poems, onEndReached } = this.props;
    return (
      <FadeIn>
        <FlatList
          data={poems}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ justifyContent: 'center' }}
        />
      </FadeIn>
    );
  }
}

export default PoemList;
