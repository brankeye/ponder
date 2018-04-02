import React from 'react';
import { View, Text, TouchableHighlight } from '@@components/presenters';

const PoemCard = ({ poem, underlayColor, onPress }) => {
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      onPress={() => onPress(poem.id)}
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
          {poem.title} by {poem.author.name}
        </Text>
        <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
          {poem.teaser}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default PoemCard;
