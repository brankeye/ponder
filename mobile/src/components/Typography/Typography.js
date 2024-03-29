import React from 'react';
import { Text } from 'react-native';
import Paint, { StylesConsumer } from 'react-native-paint';

const paint = Paint.create(theme => ({
  root: {
    color: theme.textColor,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Vollkorn-Bold',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Vollkorn-Bold',
  },
  body: {
    fontSize: 16,
    fontFamily: 'Vollkorn',
    lineHeight: 30,
  },
  detail: {
    fontSize: 14,
    fontFamily: 'Vollkorn',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
}));

const Typography = ({ type, style, ...props }) => (
  <StylesConsumer paint={paint}>
    {styles => <Text {...props} style={[styles.root, styles[type], style]} />}
  </StylesConsumer>
);

Typography.defaultProps = {
  type: 'body',
};

export default Typography;
