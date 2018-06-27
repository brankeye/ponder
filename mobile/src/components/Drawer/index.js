import React from 'react';
import Drawer from './Drawer';
import { ThemeConsumer } from '@@consumers';
import { Styles } from '@@components';

export default props => (
  <ThemeConsumer>
    {({ theme: { backgroundColor, textColor } }) => (
      <Styles
        styles={{
          scrollView: {
            flex: 1,
            backgroundColor,
          },
          container: {
            flex: 1,
            justifyContent: 'center',
          },
          drawerItem: {
            color: textColor,
          },
        }}
      >
        {styles => <Drawer {...props} styles={styles} />}
      </Styles>
    )}
  </ThemeConsumer>
);
