import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { PoemCard } from 'components/presenters';
import { inject, observer } from 'mobx-react';

class PoemList extends Component {
  keyExtractor = item => item.id;

  handleSelectPoem = id => {
    this.props.onSelectPoem(id);
  };

  renderItem = ({ item }) => (
    <PoemCard poem={item} onPress={this.handleSelectPoem} />
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

export default inject('poems')(observer(PoemList));
