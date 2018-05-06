import React from 'react';
import { View, ScrollView, Text, Toggle } from '@@components/presenters';

const AuthorView = ({ author, onLibraryChange, ...props }) => {
  const { name } = author;
  return !poem ? null : (
    <View style={{ flex: 1 }} {...props}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
      </ScrollView>
    </View>
  );
};

export default AuthorView;
