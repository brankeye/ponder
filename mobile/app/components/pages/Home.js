import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from '../../firebase';
import { inject, observer } from 'mobx-react';
import { PAGE_POEM } from '../../screens/screenNames';
import Page from './Page';

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
      <Page navigator={this.props.navigator} name='home'>
        <View style={this.props.styles.current.containerStyle}>
          <Button
            title="Click me"
            onPress={() => this.props.navigator.push({ screen: PAGE_POEM })}
          />
        </View>
      </Page>
    );
  }
}

export default Home;
