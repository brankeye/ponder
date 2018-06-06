import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { PoemCard } from '@@components';
import * as Animatable from 'react-native-animatable';

class PoemList extends Component {
  keyExtractor = ({ id }) => id;

  renderItem = ({ item }) =>
    console.log(item) || <PoemCard poem={item} onPress={this.props.onSelect} />;

  render() {
    const { poems, onFetchMore } = this.props;
    return (
      <Animatable.View
        animation={'fadeIn'}
        duration={500}
        style={{ flex: 1, width: '100%' }}
        useNativeDriver={true}
      >
        <FlatList
          data={poems}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReached={onFetchMore}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ justifyContent: 'center' }}
        />
      </Animatable.View>
    );
  }
}

export default PoemList;
