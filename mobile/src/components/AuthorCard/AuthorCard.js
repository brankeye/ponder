import React from 'react';
import { View, Button } from 'react-native';
import { Card, Typography } from '@@components';

const AuthorCard = ({ author, poemsCount, onPress }) => {
  const poems = author.poems.slice(0, poemsCount);
  return (
    <Card onPress={() => onPress(author)}>
      <Typography type={'title'}>{author.name}</Typography>
      {poems.map((poem, i) => {
        return (
          <View key={i} style={{ flex: 1, padding: '4%' }}>
            <Typography type={'subtitle'} style={{ fontWeight: 'bold' }}>
              {poem.title}
            </Typography>
            <Typography type={'body'} style={{ marginTop: '3%' }}>
              {poem.teaser.join('\n')}
            </Typography>
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
