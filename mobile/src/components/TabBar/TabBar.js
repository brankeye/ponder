import React from 'react';
import { TabBar } from 'react-native-tab-view';
import Paint, { StylesConsumer } from 'react-native-paint';
import Color from 'color';

const paint = Paint.create(theme => ({
  bar: {
    backgroundColor: Color(theme.backgroundColor)
      .darken(0.05)
      .string(),
  },
  label: { color: theme.textColor, fontWeight: 'bold' },
  indicator: { backgroundColor: theme.accentColor },
}));

const Component = props => (
  <StylesConsumer paint={paint}>
    {styles => (
      <TabBar
        {...props}
        style={styles.bar}
        labelStyle={styles.label}
        indicatorStyle={styles.indicator}
      />
    )}
  </StylesConsumer>
);

Component.defaultProps = {
  useNativeDriver: true,
  bounces: false,
};

export default Component;
