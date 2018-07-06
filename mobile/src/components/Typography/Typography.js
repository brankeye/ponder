import React from 'react';
import { Text } from 'react-native';
import { Styles } from '@@utils';

const StylesConsumer = Styles.consumer(({ textColor }) => ({
  root: {
    color: textColor,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Vollkorn-Bold',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Vollkorn',
  },
  body: {
    fontSize: 16,
    fontFamily: 'Vollkorn',
    lineHeight: 30,
  },
}));

const Typography = ({ type, style, ...props }) => (
  <StylesConsumer>
    {({ root, ...styles }) => (
      <Text {...props} style={[root, styles[type], style]} />
    )}
  </StylesConsumer>
);

Typography.defaultProps = {
  type: 'body',
};

export default Typography;
