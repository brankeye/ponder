import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'components/presenters';
import { inject, observer } from 'mobx-react';

const Poem = props => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 20
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.title}</Text>
        <Text>by {props.author}</Text>
        <Text style={{ padding: 15, flex: 1 }}>{props.content}</Text>
      </ScrollView>
    </View>
  );
};

export default inject('theme')(observer(Poem));
