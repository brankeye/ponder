import React from 'react';
import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('poemStore', 'authorStore')
@observer
class Article extends React.Component {
  render() {
    return(
      <View>
        <Text>{this.props.poemStore.poem}</Text>
        <Text>{this.props.authorStore.author}</Text>
      </View>
    );
  }
}

export default Article;
