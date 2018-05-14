import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { AuthorCard } from '@@components';
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
    const { authors, onFetchMore } = this.props;
    return (
      <Animatable.View
        animation={'fadeIn'}
        duration={500}
        style={{ flex: 1, width: '100%' }}
        useNativeDriver={true}
      >
        <FlatList
          data={authors}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          onEndReached={onFetchMore}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
        />
      </Animatable.View>
    );
  }
}

export default AuthorList;
