import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Paint, { StylesConsumer } from 'react-native-paint';
import { withTheme } from '@@consumers';

const paint = Paint.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = ({ theme }) => (
  <StylesConsumer paint={paint}>
    {styles => (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={theme.accentColor} />
      </View>
    )}
  </StylesConsumer>
);

export default withTheme(Loading);
