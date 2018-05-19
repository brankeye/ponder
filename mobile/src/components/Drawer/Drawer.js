import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { ThemeConsumer } from '@@consumers';
import { Authenticator } from '@@components';

const Drawer = ({ styles, contentContainerStyle, labelStyle, ...props }) => (
  <ScrollView
    contentContainerStyle={[styles.scrollView, contentContainerStyle]}
  >
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerItems {...props} labelStyle={[styles.drawerItem, labelStyle]} />
      <Authenticator />
    </SafeAreaView>
  </ScrollView>
);

Drawer.defaultProps = {
  contentContainerStyle: {},
  labelStyle: {},
};

export default Drawer;
