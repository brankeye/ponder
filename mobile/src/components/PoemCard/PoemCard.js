import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

const PoemCard = ({ poem, underlayColor, onPress }) => {
  const { title, teaser, author } = poem;
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      onPress={() => onPress(poem)}
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
        <Text style={{ textAlign: 'center' }}>
          {title} by {author.name}
        </Text>
        <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
          {teaser.join('\n')}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default PoemCard;
