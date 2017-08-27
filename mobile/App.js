import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from './app/firebase';
import { Provider } from 'mobx-react';
import Container from './app/components/Container';
import store from './app/stores/store';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.ref = null;
  }

  state = {
    text: "",
    content: ""
  };

  componentDidMount() {
    this.ref = firebase.database().ref('test');
    this.ref.on('value', this.handleContent);
  }

  componentWillUnmount() {
    if (this.ref) {
      this.ref.off('value', this.handleContent);
    }
  }

  handleContent = snapshot => {
    const content = snapshot.val().hello;
    this.setState({ content });
  }

  handlePress = () => {
    firebase.database()
      .ref('test')
      .set({
        hello: this.state.text
      });
  }

  handleChangeText = text => {
    this.setState({ text });
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider {...store}>
          <Container />
        </Provider>
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
