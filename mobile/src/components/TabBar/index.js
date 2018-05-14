import React from 'react';
import TabBar from './TabBar';
import { ThemeConsumer } from '@@consumers';
import { Styles } from '@@components';
import Color from 'color';

export default props => (
  <ThemeConsumer>
    {({ theme: { backgroundColor, textColor, accentColor } }) => (
      <Styles
        styles={{
          bar: {
            backgroundColor: Color(backgroundColor)
              .darken(0.05)
              .string(),
          },
          label: { color: textColor },
          indicator: { backgroundColor: accentColor },
        }}
      >
        {({ styles }) => <TabBar {...props} styles={styles} />}
      </Styles>
    )}
  </ThemeConsumer>
);
