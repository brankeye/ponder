import React from 'react';
import { View } from 'react-native';

const Column = ({ style, flex, left, center, right, ...props }) => (
  <View
    style={[
      style,
      { flexDirection: 'column', flex },
      left && { justifyContent: 'flex-start' },
      center && { justifyContent: 'center' },
      right && { justifyContent: 'flex-end' },
    ]}
    {...props}
  />
);

export default Column;
