import React from 'react';
import { View } from 'react-native';
import { Poem, Button } from 'components/presenters';
import { inject, observer } from 'mobx-react';

const PoemSection = props => (
  <View>
    <Poem
      title={props.poem.title}
      author={props.poem.author}
      content={props.poem.teaser}
    />
    <Button
      title="Favorite"
      onPress={() => props.favorites.add(props.poem.id)}
    />
  </View>
);

export default inject('favorites')(observer(PoemSection));
