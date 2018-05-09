import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { PoemCard } from '@@components';

const AuthorView = ({ author, poemsCount, onSelectPoem, ...props }) => {
  const { name, poems } = author;
  return (
    <View style={{ flex: 1 }} {...props}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          padding: '10%',
        }}
      >
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{name}</Text>
        {poems.map((poem, i) => {
          return (
            <PoemCard
              key={poem.id}
              poem={{ author, ...poem }}
              onPress={onSelectPoem}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

AuthorView.defaultProps = {
  author: { poems: [] },
};

export default AuthorView;
