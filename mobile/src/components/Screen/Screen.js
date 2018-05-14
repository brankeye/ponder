import React from 'react';
import { View } from 'react-native';

const Screen = ({ styles, style, ...props }) => (
  <View {...props} style={[styles.screen, style]} />
);

export default Screen;
