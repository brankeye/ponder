import React from 'react';
import { Text } from 'react-native';
import { Card } from '@@components';

const PoemCard = ({ poem, underlayColor, onPress }) => {
  const { title, teaser, author } = poem;
  return (
    <Card onPress={() => onPress(poem)}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{title}</Text>
      <Text>{author.name}</Text>
      <Text style={{ textAlign: 'left', fontStyle: 'italic' }}>
        {teaser.join('\n')}
      </Text>
    </Card>
  );
};

export default PoemCard;
