import React from 'react';
import { View } from 'react-native';
import { Poem } from 'components/presenters';

const PoemSection = props => (
  <View>
    <Poem title="Hyperion" author="John Keats" content="blah blah blah" />
  </View>
);

export default PoemSection;
