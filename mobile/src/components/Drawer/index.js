import React from 'react';
import Drawer from './Drawer';
import Paint, { StylesConsumer } from 'react-native-paint';

const paint = Paint.create(theme => ({
  scrollView: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  drawerItem: {
    color: theme.textColor,
  },
}));

export default props => (
  <StylesConsumer paint={paint}>
    {styles => <Drawer {...props} styles={styles} />}
  </StylesConsumer>
);
