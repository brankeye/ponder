import React from 'react';
import { View, Text, TouchableHighlight } from '@@components/presenters';

const AuthorCard = ({ author, underlayColor, onPress }) => {
  const { name, poems } = author;
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      onPress={() => onPress(author)}
    >
      <View
        style={{
          padding: 10,
          shadowRadius: 3,
          shadowOpacity: 1,
          marginVertical: 4,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ textAlign: 'center' }}>{name}</Text>
        {poems.map(poem => <Text>{poem.title}</Text>)}
      </View>
    </TouchableHighlight>
  );
};

AuthorCard.defaultProps = {
  author: { poems: [] },
};

export default AuthorCard;
