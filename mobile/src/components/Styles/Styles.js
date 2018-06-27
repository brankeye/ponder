import React from 'react';
import { StyleSheet } from 'react-native';

class Styles extends React.PureComponent {
  static defaultProps = {
    styles: {},
  };

  state = {
    styles: StyleSheet.create(this.props.styles),
  };

  render() {
    return this.props.children(this.state.styles);
  }
}

export default Styles;
