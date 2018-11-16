import React from 'react';
import { View, Button } from 'react-native';
import { PoemCard, Typography, FadeIn, ScrollView } from '@@components';
import * as Animatable from 'react-native-animatable';

const AuthorView = ({
  author,
  onSelectPoem,
  fetching,
  onFetchMore,
  ...props
}) => {
  const { name, poems } = author;
  return (
    <FadeIn>
      <ScrollView refreshing={fetching} onRefresh={onFetchMore}>
        <Typography
          type={'title'}
          style={{ paddingHorizontal: '10%', paddingTop: '10%' }}
        >
          {name}
        </Typography>
        {poems.map((poem, i) => {
          return (
            <PoemCard
              key={poem.id}
              poem={{ author, ...poem }}
              omitAuthorName
              onPress={onSelectPoem}
              style={{ paddingHorizontal: '10%' }}
            />
          );
        })}
      </ScrollView>
    </FadeIn>
  );
};

AuthorView.defaultProps = {
  author: { poems: [] },
};

export default AuthorView;
