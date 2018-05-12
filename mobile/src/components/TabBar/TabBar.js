import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { ThemeConsumer } from '@@consumers';

const Component = props => (
  <ThemeConsumer>
    {({ theme: { screenBackgroundColor, textColor } }) => (
      <TabBar
        {...props}
        style={{ backgroundColor: screenBackgroundColor }}
        labelStyle={{ color: textColor }}
      />
    )}
  </ThemeConsumer>
);

Component.defaultProps = {
  useNativeDriver: true,
  bounces: false,
};

export default Component;
