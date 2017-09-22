import React from 'react';
import { View } from 'react-native';
import { Poem, FavoriteButton } from 'components/presenters';
import { observer } from 'mobx-react';

const PoemSection = props => (
  <View>
    <Poem
      title={props.poem.title}
      author={props.poem.author}
      content={props.poem.teaser}
    />
    <FavoriteButton />
  </View>
);

export default observer(PoemSection);
