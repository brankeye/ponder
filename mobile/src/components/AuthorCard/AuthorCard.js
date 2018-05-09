import React from 'react';
import { View, Text, Button } from 'react-native';
import { Card } from '@@components';

const AuthorCard = ({ author, poemsCount, onPress }) => {
  const { name } = author;
  const poems = author.poems.slice(0, poemsCount);
  return (
    <Card onPress={() => onPress(author)}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{name}</Text>
      {poems.map((poem, i) => {
        return (
          <View key={i} style={{ flex: 1, padding: '4%' }}>
            <Text style={{ fontWeight: 'bold' }}>{poem.title}</Text>
            <Text style={{ color: '#222222' }}>{poem.teaser.join('\n')}</Text>
          </View>
        );
      })}
      {author.poems.length > 3 && (
        <Button
          title={`${author.poems.length - 3} more`}
          onPress={() => {}}
          style={{ width: '5%', height: '2%' }}
        />
      )}
    </Card>
  );
};

AuthorCard.defaultProps = {
  author: { poems: [] },
  poemsCount: 3,
};

export default AuthorCard;
