import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import pageComposer from '../composers/pageComposer';

@observer
class Favorites extends Component {
  render() {
    const { containerStyle, textStyle } = this.props.appStyle;
    return(
      <View style={containerStyle}>
        <Text style={this.props.appStyle.textStyle}>Favorites page</Text>
      </View>
    )
  }
}

export default pageComposer(Favorites);
