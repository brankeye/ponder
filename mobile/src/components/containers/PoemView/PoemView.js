import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'components/presenters';

const PoemView = ({ poem }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 20
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{poem.title}</Text>
        <Text>by {poem.authorName}</Text>
        <Text style={{ padding: 15, flex: 1 }}>{poem.content}</Text>
      </ScrollView>
    </View>
  );
};

export default PoemView;
