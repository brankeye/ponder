import React from 'react';
import { View, Text } from 'react-native';
import { Card, Typography } from '@@components';

const PoemCard = ({ poem, omitAuthorName, onPress, ...props }) => {
  const { title, teaser, author } = poem;
  return (
    <Card onPress={() => onPress(poem)} {...props}>
      <Typography type={omitAuthorName ? 'subtitle' : 'title'}>
        {title}
      </Typography>
      {!omitAuthorName && (
        <Typography type={'subtitle'}>{author.name}</Typography>
      )}
      <Typography type={'body'} style={{ marginTop: '3%' }}>
        {teaser.join('\n')}
      </Typography>
    </Card>
  );
};

PoemCard.defaultProps = {
  onPress: () => {},
};

export default PoemCard;
