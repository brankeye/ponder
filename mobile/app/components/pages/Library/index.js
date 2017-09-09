import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import composePage from '../../composers/composePage';

class Library extends Component {
  render() {
    return (
      <View>
        <Text>Library</Text>
      </View>
    );
  }
}

const page = inject('navigation')(observer(Library));
export default composePage(page);
