import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import styles from './styles';

const Card = ({ style, underlayColor, onPress, ...props }) => (
  <TouchableHighlight underlayColor={underlayColor} onPress={onPress}>
    <View {...props} style={[style, styles.card]} />
  </TouchableHighlight>
);

Card.defaultProps = {
  underlayColor: 'rgba(220, 220, 220, 0.4)',
  onPress: () => {},
};

export default Card;
