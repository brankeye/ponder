import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '../../firebase';
import themeComposer from '../../themes/composer';
import { APP_SAMPLE } from '../../screens/screenNames';

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
      <View style={styles.container}>
        <Button
          title="Click me"
          onPress={() => this.props.navigator.push({ screen: APP_SAMPLE })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default themeComposer(Home);
