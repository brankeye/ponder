import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeToggle from '../components/ThemeToggle';
import { inject, observer } from 'mobx-react';

const layout = story => (
  <Container style={styles.main}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {story()}
    </View>
    <View
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      <ThemeToggle />
    </View>
  </Container>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20
  }
});

const Container = inject('theme')(
  observer(props => {
    return (
      <View
        style={[
          styles.main,
          { backgroundColor: props.theme.appTheme.pageBackgroundColor }
        ]}
      >
        {props.children}
      </View>
    );
  })
);

export default layout;
