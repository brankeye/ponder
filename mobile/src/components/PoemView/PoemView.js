import React from 'react';
import { View, Text } from 'react-native';
import { Button, Typography, FadeIn, ScrollView } from '@@components';
import * as Animatable from 'react-native-animatable';

const PoemView = ({
  poem,
  onChangeLibrary,
  fetching,
  onFetchMore,
  ...props
}) => {
  const { title, lines, inLibrary, author } = poem;
  return !poem ? null : (
    <FadeIn>
      <ScrollView
        refreshing={fetching}
        onRefresh={onFetchMore}
        contentContainerStyle={{ padding: '10%' }}
      >
        <Typography type={'title'} selectable={true}>
          {title}
        </Typography>
        <Typography type={'subtitle'} selectable={true}>
          by {author.name}
        </Typography>
        <Typography type={'body'} selectable={true} style={{ marginTop: '3%' }}>
          {poem.lines.join('\n')}
        </Typography>
        <Button
          icon={inLibrary ? 'remove' : 'add'}
          onPress={() => onChangeLibrary(poem)}
        >
          {inLibrary ? 'Remove from library' : 'Add to library'}
        </Button>
      </ScrollView>
    </FadeIn>
  );
};

export default PoemView;
