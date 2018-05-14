import React from 'react';
import { StyleSheet } from 'react-native';

class Styles extends React.PureComponent {
  static defaultProps = {
    styles: {},
  };

  render() {
    return this.props.children({
      styles: StyleSheet.create(this.props.styles),
    });
  }
}

export default Styles;
