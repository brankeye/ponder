import React from 'react';
import { View } from 'react-native';
import { Card, Typography, Button } from '@@components';

const AuthorCard = ({ author, poemsCount, onPress }) => {
  const poems = author.poems.slice(0, poemsCount);
  return (
    <Card onPress={() => onPress(author)}>
      <Typography type={'title'}>{author.name}</Typography>
      {poems.map((poem, i) => (
        <View key={i} style={{ flex: 1, paddingVertical: '4%' }}>
          <Typography type={'subtitle'}>{poem.title}</Typography>
          <Typography type={'body'} style={{ marginTop: '3%' }}>
            {poem.teaser.join('\n')}
          </Typography>
        </View>
      ))}
      {author.poems.length > poemsCount && (
        <Button onPress={() => {}}>{`${author.poems.length -
          poemsCount} more`}</Button>
      )}
    </Card>
  );
};

AuthorCard.defaultProps = {
  author: { poems: [] },
  poemsCount: 3,
};

export default AuthorCard;
