import React from 'react';
import { View, Text } from 'react-native';
import { Card, Typography } from '@@components';

const PoemCard = ({ poem, onPress, ...props }) => {
  const { title, teaser, author } = poem;
  return (
    <Card onPress={() => onPress(poem)} {...props}>
      <Typography type={'title'}>{title}</Typography>
      <Typography type={'subtitle'}>{author.name}</Typography>
      <Typography type={'body'}>{teaser.join('\n')}</Typography>
    </Card>
  );
};

PoemCard.defaultProps = {
  onPress: () => {},
};

export default PoemCard;
