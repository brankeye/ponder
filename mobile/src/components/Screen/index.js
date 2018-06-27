import React from 'react';
import Screen from './Screen';
import { ThemeConsumer } from '@@consumers';
import { Styles } from '@@components';

export default props => (
  <ThemeConsumer>
    {({ theme: { backgroundColor } }) => (
      <Styles
        styles={{
          screen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor,
          },
        }}
      >
        {styles => <Screen {...props} styles={styles} />}
      </Styles>
    )}
  </ThemeConsumer>
);
