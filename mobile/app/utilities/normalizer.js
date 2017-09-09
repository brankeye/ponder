// Source: https://github.com/react-native-training/react-native-elements/blob/master/src/helpers/normalizeText.js

//
// Method to normalize size of fonts across devices
//
// Some code taken from https://jsfiddle.net/97ty7yjk/ &
// https://stackoverflow.com/questions/34837342/font-size-on-iphone-6s-plus
//
// author: @xiaoneng
// date: 14/10/2016
// version: 03
//

import React from 'react-native';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../constants/dimensions';
const { PixelRatio } = React;
const pixelRatio = PixelRatio.get();

// -- Testing Only --
// const fontScale = PixelRatio.getFontScale();
// const layoutSize = PixelRatio.getPixelSizeForLayoutSize(14);
// console.log('normalizeText getPR ->', pixelRatio);
// console.log('normalizeText getFS ->', fontScale);
// console.log('normalizeText getDH ->', deviceHeight);
// console.log('normalizeText getDW ->', deviceWidth);
// console.log('normalizeText getPSFLS ->', layoutSize);

const normalizer = size => {
  if (pixelRatio === 2) {
    // iphone 5s and older Androids
    if (DEVICE_WIDTH < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (DEVICE_HEIGHT < 667) {
      return size;
      // iphone 6-6s
    } else if (DEVICE_HEIGHT >= 667 && DEVICE_HEIGHT <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio === 3) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (DEVICE_WIDTH <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (DEVICE_HEIGHT < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (DEVICE_HEIGHT >= 667 && DEVICE_HEIGHT <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (pixelRatio === 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (DEVICE_WIDTH <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (DEVICE_HEIGHT < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (DEVICE_HEIGHT >= 667 && DEVICE_HEIGHT <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5
  return size;
};

export default normalizer; // eslint-disable-line no-undef