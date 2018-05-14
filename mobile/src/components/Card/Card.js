import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import styles from './styles';

const Card = ({ style, underlayColor, onPress, children, ...props }) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor={underlayColor}
    style={[styles.card, style]}
    {...props}
  >
    <React.Fragment>{children}</React.Fragment>
  </TouchableHighlight>
);

Card.defaultProps = {
  underlayColor: '#AAAAAA',
  onPress: () => {},
};

export default Card;
