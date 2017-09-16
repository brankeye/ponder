import React from 'react';
import { Text as RNEText } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import { getDynamicStyles } from './styles';

const Text = props => {
  const { style } = getDynamicStyles(props.theme.appTheme);
  return (
    <RNEText {...props} style={style}>
      {props.children}
    </RNEText>
  );
};

export default inject('theme')(observer(Text));
