import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from './app/firebase';

export default class App extends React.Component {
  componentDidMount() {
    console.log("Logging test...");
    firebase.database()
      .ref('test')
      .set({
        hello: "world!"
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
