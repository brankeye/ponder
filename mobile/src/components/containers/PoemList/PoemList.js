import React, { Component } from 'react';
import { FlatList } from '@@components/presenters';
import { PoemCard } from '@@components/containers';

class PoemList extends Component {
  keyExtractor = ({ id }) => id;

  handleSelectPoem = id => {
    this.props.onSelectPoem(id);
  };

  renderItem = ({ item }) => (
    <PoemCard
      poem={item}
      underlayColor={'rgba(220, 220, 220, 0.4)'}
      onPress={this.handleSelectPoem}
    />
  );

  render() {
    const { poems, onFetchMore } = this.props;
    return (
      <FlatList
        data={poems}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={onFetchMore}
      />
    );
  }
}

export default PoemList;
