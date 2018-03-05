import React from 'react';
import { View, StatusBar } from 'react-native';
import Expo from 'expo';

const Component = ({ ...props }) => (
  <View
    style={{
      height: Expo.Constants.statusBarHeight,
      backgroundColor: 'rgb(0, 120, 255)'
    }}
  >
    <StatusBar translucent={true} {...props} />
  </View>
);

export default Component;
