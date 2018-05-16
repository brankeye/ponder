import React from 'react';
import { View } from 'react-native';
import { TouchableHighlight } from '@@components';
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
  onPress: () => {},
};

export default Card;
