import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { observer } from 'mobx-react/native';

const PoemCard = props => {
  return (
    <TouchableHighlight
      underlayColor={props.underlayColor}
      onPress={() => props.onPress(props.poem.id)}
    >
      <View
        style={{
          padding: 10,
          shadowRadius: 3,
          shadowOpacity: 1,
          marginVertical: 4,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20
        }}
      >
        <Text style={{ textAlign: 'center' }}>
          {props.poem.title} by {props.poem.author}
        </Text>
        <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
          {props.poem.teaser}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default observer(PoemCard);