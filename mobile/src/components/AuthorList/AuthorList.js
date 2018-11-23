import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { FadeIn } from '@@components';
import * as Animatable from 'react-native-animatable';

class AuthorList extends Component {
  keyExtractor = ({ id }) => id;

  renderItem = ({ item }) => this.props.children(item);

  render() {
    const { authors, ...props } = this.props;
    return (
      <FadeIn>
        <FlatList
          data={authors}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: '100%' }}
          {...props}
        />
      </FadeIn>
    );
  }
}

export default AuthorList;
