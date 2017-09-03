import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import pageComposer from '../composers/pageComposer';
import styles from '../../styles';

@observer
class Library extends Component {
  render() {
    const { pageBackgroundColor, textColor } = this.props.appStyle;
    const pageStyle = [pageBackgroundColor, styles.container];
    return(
      <View style={pageStyle}>
        <Text style={textColor}>Library page</Text>
      </View>
    )
  }
}

export default pageComposer(Library);
