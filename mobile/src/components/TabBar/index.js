import React from 'react';
import TabBar from './TabBar';
import Color from 'color';
import { Styles } from '@@utils';

const StylesConsumer = Styles.consumer(theme => ({
  bar: {
    backgroundColor: Color(theme.backgroundColor)
      .darken(0.05)
      .string(),
  },
  label: { color: theme.textColor },
  indicator: { backgroundColor: theme.accentColor },
}));

export default props => (
  <StylesConsumer>
    {styles => <TabBar {...props} styles={styles} />}
  </StylesConsumer>
);
