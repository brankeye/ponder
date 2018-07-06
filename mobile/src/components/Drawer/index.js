import React from 'react';
import Drawer from './Drawer';
import { Styles } from '@@utils';

const StylesConsumer = Styles.consumer(theme => ({
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
  <StylesConsumer>
    {styles => <Drawer {...props} styles={styles} />}
  </StylesConsumer>
);
