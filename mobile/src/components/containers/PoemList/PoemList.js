import React, { Component } from 'react';
import { FlatList } from 'components/presenters';
import { PoemCard } from 'components/containers';

class PoemList extends Component {
  keyExtractor = ({ id }) => id;

  handleSelectPoem = id => {
    this.props.onSelectPoem(id);
  };

  renderItem = ({ item }) => (
    <PoemCard
      poem={item}
      underlayColor={'#CCCCCC'}
      onPress={this.handleSelectPoem}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.poems}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default PoemList;
