import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '../../firebase';
import { inject, observer } from 'mobx-react';
import { PAGE_POEM } from '../../screens/screenNames';
import pageComposer from '../composers/pageComposer';

@observer
class Home extends Component {
  render() {
    return (
      <View style={this.props.styles.appStyle.containerStyle}>
        <Button
          title="Click me"
          onPress={() => this.props.navigator.push({ screen: PAGE_POEM })}
        />
      </View>
    );
  }
}

export default pageComposer(Home);
