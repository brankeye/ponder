import React, { Component } from 'react';
import { Button } from 'react-native';

class Toggle extends Component {
  state = {
    isActive: this.props.isActive,
  };

  handlePress = () => {
    const isActive = !this.state.isActive;
    this.setState({ isActive });
    this.props.onToggle(isActive);
  };

  render() {
    const title = this.state.isActive
      ? this.props.activeText
      : this.props.inactiveText;
    return <Button {...this.props} title={title} onPress={this.handlePress} />;
  }
}

Toggle.defaultProps = {
  isActive: false,
};

export default Toggle;
