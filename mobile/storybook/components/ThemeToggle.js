import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'components/presenters';
import { inject, observer } from 'mobx-react/native';

const ThemeToggle = inject('theme')(
  observer(props => (
    <View style={styles.main}>
      {props.children}
      <Button title="Toggle theme" onPress={props.theme.toggleTheme} />
      <Text
        style={{ alignSelf: 'center', color: props.theme.appTheme.textColor }}
      >
        {props.theme.currentTheme}
      </Text>
    </View>
  ))
);

const styles = StyleSheet.create({
  main: {
    padding: 20
  }
});

export default ThemeToggle;
