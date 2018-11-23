import React from 'react';
import { View } from 'react-native';
import { Card, Typography, Row } from '@@components';
import { format, isToday, isThisYear } from 'date-fns';

const getDateString = date => {
  if (date) {
    if (isToday(date)) return 'Seen today';
    if (isThisYear(date)) return format(date, '[Seen] MMMM Mo');
    return format(date, '[Seen] MMMM Mo YYYY');
  } else {
    return null;
  }
};

const AuthorCard = ({ author, poemsCount, onPress }) => {
  const poems = author.poems.slice(0, poemsCount);
  return (
    <Card onPress={() => onPress(author)}>
      <Row left>
        <Typography type={'title'}>{author.name}</Typography>
        {author.poems.length > poemsCount && (
          <Typography type={'detail'}>{`${author.poems.length -
            poemsCount} more`}</Typography>
        )}
      </Row>
      {poems.map((poem, i) => (
        <View key={i} style={{ flex: 1, paddingVertical: '4%' }}>
          <Typography type={'subtitle'}>{poem.title}</Typography>
          <Typography type={'body'} style={{ marginTop: '3%' }}>
            {poem.teaser.join('\n')}
          </Typography>
        </View>
      ))}
      <Row right>
        <Typography type={'detail'} style={{ marginTop: '3%' }}>
          {getDateString(author.viewedAt)}
        </Typography>
      </Row>
    </Card>
  );
};

AuthorCard.defaultProps = {
  author: { poems: [] },
  poemsCount: 3,
};

export default AuthorCard;
