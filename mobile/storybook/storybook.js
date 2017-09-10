/* eslint-disable global-require */

import { AppRegistry } from 'react-native';
import {
  getStorybookUI,
  configure,
  addDecorator
} from '@storybook/react-native';
import { Navigation } from 'react-native-navigation';
import providerDecorator from './decorators/provider';
import layoutDecorator from './decorators/layout';

// import stories
configure(() => {
  addDecorator(layoutDecorator);
  addDecorator(providerDecorator);
  require('./stories');
}, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
Navigation.registerComponent('mobile', () => StorybookUI);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'mobile',
    title: 'Storybook'
  }
});
