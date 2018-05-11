import React from 'react';
import { Text } from 'react-native';
import { Card, Typography } from '@@components';

const PoemCard = ({ poem, underlayColor, onPress }) => {
  const { title, teaser, author } = poem;
  return (
    <Card onPress={() => onPress(poem)}>
      <Typography type={'title'} style={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <Typography type={'subtitle'}>{author.name}</Typography>
      <Typography type={'body'} style={{ textAlign: 'left' }}>
        {teaser.join('\n')}
      </Typography>
    </Card>
  );
};

export default PoemCard;
