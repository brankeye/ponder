import React from 'react';
import Expo from 'expo';
import { Provider } from 'mobx-react/native';
import { default as Navigator } from 'navigation';
import stores from 'stores';

const App = () => (
  <Provider {...stores}>
    <Navigator />
  </Provider>
);

Expo.registerRootComponent(App);
