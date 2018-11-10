import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Paint, { StylesConsumer } from 'react-native-paint';

const paint = Paint.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = () => (
  <StylesConsumer paint={paint}>
    {styles => (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )}
  </StylesConsumer>
);

export default Loading;
