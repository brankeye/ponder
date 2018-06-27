import React from 'react';
import { Text } from 'react-native';
import { StylesConsumer } from '@@consumers';

const Typography = ({ type, style, ...props }) => (
  <StylesConsumer
    styles={({ textColor }) => ({
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
    })}
  >
    {({ root, ...styles }) => (
      <Text {...props} style={[root, styles[type], style]} />
    )}
  </StylesConsumer>
);

Typography.defaultProps = {
  type: 'body',
};

export default Typography;
