import React, { Component } from 'react';
import Expo from 'expo';
import { Provider } from 'mobx-react/native';
import { default as Navigator } from 'navigation';
import stores from 'stores';

class App extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
  }

  render() {
    return (
      <Provider {...stores}>
        <Navigator />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
