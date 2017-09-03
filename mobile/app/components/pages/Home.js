import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '../../firebase';
import { inject, observer } from 'mobx-react';
import { PAGE_POEM } from '../../screens/screenNames';

@inject('styles')
@observer
class Home extends Component {
  componentDidMount() {
    firebase
      .database()
      .ref('test')
      .set({
        hello: 'there!!!'
      });
  }

  render() {
    return (
      <View style={this.props.styles.current.containerStyle}>
        <Button
          title="Click me"
          onPress={() => this.props.navigator.push({ screen: PAGE_POEM })}
        />
      </View>
    );
  }
}

export default Home;
