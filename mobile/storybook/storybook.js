/* eslint-disable global-require */

import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import { Navigation } from 'react-native-navigation';

// import stories
configure(() => {
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
