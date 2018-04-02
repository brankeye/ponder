import React from 'react';
import { FlatList } from 'react-native';

const Component = ({ data, ...props }) =>
  data && data.length > 0 ? <FlatList data={data} {...props} /> : null;

export default Component;
