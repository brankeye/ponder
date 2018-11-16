import * as React from 'react';
import * as Animatable from 'react-native-animatable';

const FadeIn = props => (
  <Animatable.View
    animation={'fadeIn'}
    duration={500}
    style={{ flex: 1, width: '100%' }}
    useNativeDriver={true}
    {...props}
  />
);

export default FadeIn;
