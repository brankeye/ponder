import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

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
        {poems.map((poem, i) => <Text key={i}>{poem.title}</Text>)}
      </View>
    </TouchableHighlight>
  );
};

AuthorCard.defaultProps = {
  author: { poems: [] },
};

export default AuthorCard;
