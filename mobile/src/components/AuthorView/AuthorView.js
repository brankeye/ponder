import React from 'react';
import { PoemCard, Typography, FadeIn, ScrollView } from '@@components';
import { compose } from 'recompose';
import { withViewAuthor } from '@@utils/hocs';

const enhance = compose(withViewAuthor);

const AuthorView = ({ author, onSelectPoem, fetching, onFetchMore }) => {
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
        {poems.map(poem => (
          <PoemCard
            key={poem.id}
            poem={{ author, ...poem }}
            omitAuthorName
            onPress={onSelectPoem}
            style={{ paddingHorizontal: '10%' }}
          />
        ))}
      </ScrollView>
    </FadeIn>
  );
};

AuthorView.defaultProps = {
  author: { poems: [] },
};

export default enhance(AuthorView);
