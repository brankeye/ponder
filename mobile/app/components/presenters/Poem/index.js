import React from 'react';
import { View } from 'react-native';
import { Text } from 'components/presenters';
import { inject, observer } from 'mobx-react';

const Poem = props => {
  return (
    <View>
      <Text>
        {props.title} by {props.author}
      </Text>
      <Text>{props.content}</Text>
    </View>
  );
};

export default inject('theme')(observer(Poem));
