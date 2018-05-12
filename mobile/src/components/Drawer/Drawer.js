import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { ThemeConsumer } from '@@consumers';

const Drawer = props => (
  <ThemeConsumer>
    {({ theme: { screenBackgroundColor, textColor } }) => (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: screenBackgroundColor,
        }}
      >
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <DrawerItems {...props} labelStyle={{ color: textColor }} />
        </SafeAreaView>
      </ScrollView>
    )}
  </ThemeConsumer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Drawer;
