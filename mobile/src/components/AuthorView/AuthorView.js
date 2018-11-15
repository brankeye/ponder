import React from 'react';
import { View, Button, ScrollView } from 'react-native';
import { PoemCard, Typography } from '@@components';
import * as Animatable from 'react-native-animatable';

const AuthorView = ({ author, onSelectPoem, ...props }) => {
  const { name, poems } = author;
  return (
    <Animatable.View
      animation={'fadeIn'}
      duration={500}
      style={{ flex: 1 }}
      useNativeDriver={true}
      {...props}
    >
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
    </Animatable.View>
  );
};

AuthorView.defaultProps = {
  author: { poems: [] },
};

export default AuthorView;
