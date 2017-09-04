import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('poems')
@observer
class PoemsList extends Component {
  render() {
    return (
      <View>
        {
          this.props.poems.poemList.map((poem, i) => (
            <Text key={i}>{poem.title + ' by ' + poem.author + '\n' + poem.teaser + '\n'}</Text>
          ))
        }
      </View>
    );
  }
}

export default PoemsList;
