import * as React from 'react';
import { ScrollView, RefreshControl } from 'react-native';

export default ({ refreshing, onRefresh, ...props }) => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    refreshControl={
      onRefresh && (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      )
    }
    {...props}
  />
);
