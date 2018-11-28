import React from 'react';
import { compose } from 'recompose';
import { Button, Typography, FadeIn, ScrollView } from '@@components';
import { withViewPoem } from '@@utils/hocs';

const enhance = compose(withViewPoem);

const PoemView = ({ poem, onUpdateLibrary, fetching, onFetchMore }) => {
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
          {lines.join('\n')}
        </Typography>
        <Button
          icon={inLibrary ? 'remove' : 'add'}
          onPress={() =>
            onUpdateLibrary({ ...poem, inLibrary: !poem.inLibrary })
          }
        >
          {inLibrary ? 'Remove from library' : 'Add to library'}
        </Button>
      </ScrollView>
    </FadeIn>
  );
};

export default enhance(PoemView);
