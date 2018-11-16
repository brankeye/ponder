import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { AuthorCard, FadeIn } from '@@components';
import * as Animatable from 'react-native-animatable';

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
    const { authors, onEndReached } = this.props;
    return (
      <FadeIn>
        <FlatList
          data={authors}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
        />
      </FadeIn>
    );
  }
}

export default AuthorList;
