import React from 'react';
import { View } from 'react-native';

const Component = ({ hide, ...props }) => (hide ? null : <View {...props} />);

export default Component;
