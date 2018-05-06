import React, { Component } from 'react';
import { FlatList } from '@@components/presenters';
import { AuthorCard } from '@@components/containers';

class AuthorList extends Component {
  keyExtractor = ({ id }) => id;

  renderItem = ({ item }) => (
    <AuthorCard
      author={item}
      underlayColor={'rgba(220, 220, 220, 0.4)'}
      onPress={this.props.onSelect}
    />
  );

  render() {
    const { authors, onFetchMore } = this.props;
    return (
      <FlatList
        data={authors}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={onFetchMore}
      />
    );
  }
}

export default AuthorList;
