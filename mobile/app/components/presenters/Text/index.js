import React from 'react';
import { Text as RNEText } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import { getDynamicStyles } from './styles';

const Text = props => {
  const { style } = getDynamicStyles(props.theme.appTheme);
  const textStyle = [style, props.style];
  return (
    <RNEText {...props} style={textStyle}>
      {props.children}
    </RNEText>
  );
};

export default inject('theme')(observer(Text));
