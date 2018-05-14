import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Toggle, Typography } from '@@components';
import * as Animatable from 'react-native-animatable';

const PoemView = ({ poem, onChangeLibrary, ...props }) => {
  const { title, lines, inLibrary, author } = poem;
  return !poem ? null : (
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
          padding: '10%',
        }}
      >
        <Typography type={'title'}>{title}</Typography>
        <Typography type={'subtitle'}>by {author.name}</Typography>
        <Typography type={'body'}>{poem.lines.join('\n')}</Typography>
        <Toggle
          isActive={inLibrary}
          activeText="Remove from library"
          inactiveText="Add to library"
          onToggle={() => onChangeLibrary(poem)}
        />
      </ScrollView>
    </Animatable.View>
  );
};

export default PoemView;
