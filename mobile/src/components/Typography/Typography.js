import React from 'react';
import { Text } from 'react-native';
import { ThemeConsumer } from '@@consumers';
import styles from './styles';

const Typography = ({ type, style, ...props }) => (
  <ThemeConsumer>
    {({ theme: { textColor } }) => (
      <Text {...props} style={[{ color: textColor }, styles[type], style]} />
    )}
  </ThemeConsumer>
);

Typography.defaultProps = {
  type: 'body',
};

export default Typography;
