import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { FadeIn } from '@@components';

class PoemList extends Component {
  keyExtractor = ({ id }) => id;

  renderItem = ({ item }) => this.props.children(item);

  render() {
    const { poems, ...props } = this.props;
    return (
      <FadeIn>
        <FlatList
          data={poems}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ justifyContent: 'center' }}
          {...props}
        />
      </FadeIn>
    );
  }
}

export default PoemList;
