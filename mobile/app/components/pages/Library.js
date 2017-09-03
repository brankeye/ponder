import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import pageComposer from '../composers/pageComposer';

@observer
class Library extends Component {
  render() {
    const { containerStyle, textStyle } = this.props.appStyle;
    return(
      <View style={containerStyle}>
        <Text style={this.props.appStyle.textStyle}>Library page</Text>
      </View>
    )
  }
}

export default pageComposer(Library);
