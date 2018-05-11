import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Toggle, Typography } from '@@components';

const PoemView = ({ poem, onLibraryChange, ...props }) => {
  const { title, lines, inLibrary, author } = poem;
  return !poem ? null : (
    <View style={{ flex: 1 }} {...props}>
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
          onToggle={onLibraryChange}
        />
      </ScrollView>
    </View>
  );
};

export default PoemView;
