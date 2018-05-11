import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { PoemCard } from '@@components';

class PoemList extends Component {
  keyExtractor = ({ id }) => id;

  renderItem = ({ item }) => (
    <PoemCard poem={item} onPress={this.props.onSelect} />
  );

  render() {
    const { poems, onFetchMore } = this.props;
    return (
      <FlatList
        data={poems}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={onFetchMore}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: '100%' }}
      />
    );
  }
}

export default PoemList;
