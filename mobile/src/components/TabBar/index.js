import React from 'react';
import TabBar from './TabBar';
import Color from 'color';
import Paint, { StylesConsumer } from 'react-native-paint';

const paint = Paint.create(theme => ({
  bar: {
    backgroundColor: Color(theme.backgroundColor)
      .darken(0.05)
      .string(),
  },
  label: { color: theme.textColor },
  indicator: { backgroundColor: theme.accentColor },
}));

export default props => (
  <StylesConsumer paint={paint}>
    {styles => <TabBar {...props} styles={styles} />}
  </StylesConsumer>
);
