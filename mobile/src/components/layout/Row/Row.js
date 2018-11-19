import React from 'react';
import { View } from 'react-native';

const Row = ({ style, flex, left, center, right, ...props }) => (
  <View
    style={[
      style,
      { flexDirection: 'row', alignItems: 'center', flex },
      left && { justifyContent: 'flex-start' },
      center && { justifyContent: 'center' },
      right && { justifyContent: 'flex-end' },
    ]}
    {...props}
  />
);

export default Row;
