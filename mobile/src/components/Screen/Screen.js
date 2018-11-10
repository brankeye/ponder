import React from 'react';
import { View } from 'react-native';
import Paint, { StylesConsumer } from 'react-native-paint';

const paint = Paint.create(theme => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: theme.backgroundColor,
  },
}));

const Screen = ({ style, ...props }) => (
  <StylesConsumer paint={paint}>
    {styles => <View {...props} style={[styles.screen, style]} />}
  </StylesConsumer>
);

export default Screen;
