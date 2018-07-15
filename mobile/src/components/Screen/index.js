import React from 'react';
import Screen from './Screen';
import Paint, { StylesConsumer } from 'react-native-paint';

const paint = Paint.create(theme => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.backgroundColor,
  },
}));

export default props => (
  <StylesConsumer paint={paint}>
    {styles => <Screen {...props} styles={styles} />}
  </StylesConsumer>
);
