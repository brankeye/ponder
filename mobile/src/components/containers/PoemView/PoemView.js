import React from 'react';
import { View, ScrollView, Text, Toggle } from '@@components/presenters';

const PoemView = ({ poem, onFavorite, ...props }) => {
  const { title, lines, isBookmarked, author } = poem;
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
          isActive={isBookmarked}
          activeText="Unfavorite"
          inactiveText="Favorite"
          onToggle={onFavorite}
        />
      </ScrollView>
    </View>
  );
};

export default PoemView;
