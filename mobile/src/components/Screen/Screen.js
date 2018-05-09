import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const Screen = ({ style, ...props }) => (
  <View {...props} style={[styles.screen, style]} />
);

export default Screen;
