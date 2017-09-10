import React from 'react';
import { Text as RNEText } from 'react-native-elements';
import { inject, observer } from 'mobx-react';

const Text = props => {
  const style = props.style || { color: props.theme.appTheme.textColor };
  return (
    <RNEText {...props} style={style}>
      {props.children}
    </RNEText>
  );
};

export default inject('theme')(observer(Text));
