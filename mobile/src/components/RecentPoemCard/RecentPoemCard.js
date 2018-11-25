import React from 'react';
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

const PoemCard = ({ poem, onPress, ...props }) => {
  const { title, teaser, author, inLibrary, viewedAt } = poem;
  return (
    <Card onPress={() => onPress(poem)} {...props}>
      <Typography type={'title'}>{title}</Typography>
      <Typography type={'subtitle'}>{author.name}</Typography>
      <Typography type={'body'} style={{ marginTop: '3%' }}>
        {teaser.join('\n')}
      </Typography>
      <Typography type={'detail'}>
        {inLibrary ? 'In library' : 'Not in library'}
      </Typography>
      <Row right>
        <Typography type={'detail'} style={{ marginTop: '3%' }}>
          {getDateString(viewedAt)}
        </Typography>
      </Row>
    </Card>
  );
};

PoemCard.defaultProps = {
  onPress: () => {},
};

export default PoemCard;
