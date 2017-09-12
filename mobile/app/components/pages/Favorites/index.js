import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import composePage from 'components/pages/composePage';

class Favorites extends Component {
  render() {
    return (
      <View>
        <Text>Favorites</Text>
      </View>
    );
  }
}

const page = observer(Favorites);
export default composePage(page);
