import React from 'react';
import { Button as RNEButton } from 'react-native-elements';
import { inject, observer } from 'mobx-react';

const Button = props => {
  const buttonStyle = props.buttonStyle || {
    backgroundColor: props.theme.appTheme.primaryColor
  };
  return <RNEButton {...props} rounded buttonStyle={buttonStyle} />;
};

export default inject('theme')(observer(Button));
