import React from 'react';
import { View } from 'react-native';
import { Text } from 'components/presenters';
import { inject, observer } from 'mobx-react';

const Poem = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 40
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.title}</Text>
      <Text>by {props.author}</Text>
      <Text style={{ padding: 15 }}>{props.content}</Text>
    </View>
  );
};

export default inject('theme')(observer(Poem));
