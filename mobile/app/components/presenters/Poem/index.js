import React from 'react';
import { View } from 'react-native';
import { Text } from 'components/presenters';

const Poem = props => (
  <View>
    <Text>
      {props.title} by {props.author}
    </Text>
    <Text>{props.content}</Text>
  </View>
);

export default Poem;
