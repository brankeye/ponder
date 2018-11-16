import React from 'react';
import { View, Button, ScrollView } from 'react-native';
import { PoemCard, Typography, FadeIn } from '@@components';
import * as Animatable from 'react-native-animatable';

const AuthorView = ({ author, onSelectPoem, ...props }) => {
  const { name, poems } = author;
  return (
    <FadeIn>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
      >
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
