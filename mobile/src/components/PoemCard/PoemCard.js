import React from 'react';
import { View, Text } from 'react-native';
import { Card, Typography } from '@@components';
import { format } from 'date-fns';

const PoemCard = ({
  poem,
  omitAuthorName,
  showViewedAt,
  onPress,
  ...props
}) => {
  const { title, teaser, author, viewedAt } = poem;
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
      {showViewedAt && (
        <Typography type={'detail'} style={{ marginTop: '3%' }}>
          {format(viewedAt, '[Seen] MMMM Mo YYYY [at] h:mm A')}
        </Typography>
      )}
    </Card>
  );
};

PoemCard.defaultProps = {
  onPress: () => {},
};

export default PoemCard;
