import React from 'react';
import Screen from './Screen';
import { Styles } from '@@utils';

const StylesConsumer = Styles.consumer(theme => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.backgroundColor,
  },
}));

export default props => (
  <StylesConsumer>
    {styles => <Screen {...props} styles={styles} />}
  </StylesConsumer>
);
