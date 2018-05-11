import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ThemeConsumer } from '@@consumers';

const Screen = ({ style, ...props }) => (
  <ThemeConsumer>
    {({ theme: { screenBackgroundColor } }) => (
      <View
        {...props}
        style={[
          { backgroundColor: screenBackgroundColor },
          styles.screen,
          style,
        ]}
      />
    )}
  </ThemeConsumer>
);

export default Screen;
