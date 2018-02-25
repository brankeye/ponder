import React, { Component } from 'react';
import { Button } from 'react-native';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.isActive
    };
  }

  handlePress = () => {
    const isActive = !this.state.isActive;
    this.props.onToggle(isActive);
    this.setState({ isActive });
  };

  render() {
    const title = this.state.isActive
      ? this.props.activeText
      : this.props.inactiveText;
    return <Button {...this.props} title={title} onPress={this.handlePress} />;
  }
}

Toggle.defaultProps = {
  isActive: false
};

export default Toggle;
