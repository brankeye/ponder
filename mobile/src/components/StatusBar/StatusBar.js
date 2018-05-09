import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles';

const Component = ({ style, ...props }) => (
  <View style={[styles.statusBar, style]}>
    <StatusBar {...props} />
  </View>
);

export default Component;
