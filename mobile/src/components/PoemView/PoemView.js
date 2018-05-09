import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Toggle } from '@@components';

const PoemView = ({ poem, onLibraryChange, ...props }) => {
  const { title, lines, inLibrary, author } = poem;
  return !poem ? null : (
    <View style={{ flex: 1 }} {...props}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
        <Text>by {author.name}</Text>
        <Text style={{ padding: 15, flex: 1 }}>{poem.lines.join('\n')}</Text>
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
