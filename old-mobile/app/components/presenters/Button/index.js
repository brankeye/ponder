import React from 'react';
import { Button as RNEButton } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { getDynamicStyles } from './styles';

const Button = props => {
  const { textStyle } = getDynamicStyles(props.theme.appTheme);
  console.log('textStyle: ' + JSON.stringify(textStyle));
  const _textStyle = props.textStyle || textStyle;
  return <RNEButton {...props} rounded textStyle={_textStyle} />;
};

export default inject('theme')(observer(Button));
