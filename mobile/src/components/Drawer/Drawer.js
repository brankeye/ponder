import React from 'react';
import { ScrollView } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import Paint, { StylesConsumer } from 'react-native-paint';

const paint = Paint.create(theme => ({
  scrollView: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  drawerItem: {
    color: theme.textColor,
  },
}));

const Drawer = ({ contentContainerStyle, labelStyle, ...props }) => (
  <StylesConsumer paint={paint}>
    {styles => (
      <ScrollView
        contentContainerStyle={[styles.scrollView, contentContainerStyle]}
      >
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <DrawerItems
            {...props}
            labelStyle={[styles.drawerItem, labelStyle]}
          />
        </SafeAreaView>
      </ScrollView>
    )}
  </StylesConsumer>
);

Drawer.defaultProps = {
  contentContainerStyle: {},
  labelStyle: {},
};

export default Drawer;
