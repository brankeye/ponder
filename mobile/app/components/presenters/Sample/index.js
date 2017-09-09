import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react/native';

const Sample = inject('theme')(
  observer(props => {
    console.log('theme: ' + JSON.stringify(props));
    return (
      <View style={props.theme.appStyle.pageBackgroundColor}>
        <Text style={props.theme.appStyle.textColor}>{props.text}</Text>
        <Button title="Click me" onPress={props.theme.toggleTheme} />
      </View>
    );
  })
);

export default Sample;
