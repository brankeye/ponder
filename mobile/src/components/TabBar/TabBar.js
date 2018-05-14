import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { TabBar } from 'react-native-tab-view';

const Component = ({ styles, ...props }) => (
  <TabBar
    {...props}
    style={styles.bar}
    labelStyle={styles.label}
    indicatorStyle={styles.indicator}
  />
);

Component.defaultProps = {
  styles: {},
  useNativeDriver: true,
  bounces: false,
};

export default Component;
